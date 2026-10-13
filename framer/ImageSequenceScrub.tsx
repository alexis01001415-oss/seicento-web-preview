import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

type FramerImage = { src?: string; srcSet?: string; alt?: string }

type Props = {
    sourceMode: "pattern" | "images"
    images: FramerImage[]
    baseUrl: string
    filePrefix: string
    fileExtension: string
    firstFrame: number
    frameCount: number
    padDigits: number
    scrollScreens: number
    fit: "contain" | "cover"
    backgroundColor: string
    accessibleLabel: string
    style?: React.CSSProperties
}

const SILKY_BASE =
    "https://alexis01001415-oss.github.io/seicento-web-preview/assets/silky/sequence"

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

function getFrameUrls(props: Props): string[] {
    if (props.sourceMode === "images") {
        return (props.images || [])
            .map((image) => (typeof image === "string" ? image : image?.src))
            .filter((src): src is string => Boolean(src))
    }

    const base = (props.baseUrl || "").trim().replace(/\/+$/, "")
    if (!base) return []

    const count = clamp(Math.floor(props.frameCount || 0), 1, 400)
    const first = Math.max(0, Math.floor(props.firstFrame || 0))
    const digits = clamp(Math.floor(props.padDigits || 1), 1, 8)
    const extension = (props.fileExtension || "webp").trim().replace(/^\./, "")

    return Array.from({ length: count }, (_, index) => {
        const number = String(first + index).padStart(digits, "0")
        return `${base}/${props.filePrefix || ""}${number}.${extension}`
    })
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 2400
 */
export default function ImageSequenceScrub(props: Props) {
    const {
        scrollScreens,
        fit,
        backgroundColor,
        accessibleLabel,
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const sectionRef = React.useRef<HTMLDivElement>(null)
    const stageRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const urls = React.useMemo(
        () => getFrameUrls(props),
        [
            props.sourceMode,
            props.images,
            props.baseUrl,
            props.filePrefix,
            props.fileExtension,
            props.firstFrame,
            props.frameCount,
            props.padDigits,
        ]
    )

    React.useEffect(() => {
        if (isStatic || !urls.length) return

        const section = sectionRef.current
        const stage = stageRef.current
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")
        if (!section || !stage || !canvas || !context) return

        let disposed = false
        let raf = 0
        let target = 0
        let painted = -1
        let activeLoads = 0
        let queue: number[] = []
        const queued = new Set<number>()
        const loading = new Set<number>()
        const cache = new Map<number, HTMLImageElement>()
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

        function remember(index: number, image: HTMLImageElement) {
            cache.delete(index)
            cache.set(index, image)
            while (cache.size > 16) {
                const oldest = cache.keys().next().value
                if (oldest === undefined) break
                cache.delete(oldest)
            }
        }

        function paint(index: number) {
            const image = cache.get(index)
            if (!image || !image.naturalWidth || !image.naturalHeight) return
            remember(index, image)

            const width = stage.clientWidth
            const height = stage.clientHeight
            if (!width || !height) return

            const scale =
                fit === "cover"
                    ? Math.max(width / image.naturalWidth, height / image.naturalHeight)
                    : Math.min(width / image.naturalWidth, height / image.naturalHeight)
            const drawWidth = image.naturalWidth * scale
            const drawHeight = image.naturalHeight * scale

            context.clearRect(0, 0, width, height)
            context.fillStyle = backgroundColor
            context.fillRect(0, 0, width, height)
            context.drawImage(
                image,
                (width - drawWidth) / 2,
                (height - drawHeight) / 2,
                drawWidth,
                drawHeight
            )
            painted = index
        }

        function pump() {
            while (!disposed && activeLoads < 4 && queue.length) {
                const index = queue.shift()!
                queued.delete(index)
                loading.add(index)
                activeLoads += 1

                const image = new Image()
                image.decoding = "async"
                image.onload = async () => {
                    try {
                        if (image.decode) await image.decode().catch(() => {})
                        if (!disposed) {
                            remember(index, image)
                            if (index === target) paint(index)
                        }
                    } finally {
                        loading.delete(index)
                        activeLoads -= 1
                        pump()
                    }
                }
                image.onerror = () => {
                    loading.delete(index)
                    activeLoads -= 1
                    pump()
                }
                image.src = urls[index]
            }
        }

        function enqueue(index: number, priority = false) {
            if (
                index < 0 ||
                index >= urls.length ||
                cache.has(index) ||
                loading.has(index)
            ) {
                return
            }
            if (queued.has(index)) {
                if (priority) {
                    queue = queue.filter((queuedIndex) => queuedIndex !== index)
                    queue.unshift(index)
                }
                return
            }
            if (priority) queue.unshift(index)
            else queue.push(index)
            queued.add(index)
        }

        function preloadNearby(index: number, previous: number) {
            queue = queue.filter((queuedIndex) => {
                const keep = Math.abs(queuedIndex - index) <= 12
                if (!keep) queued.delete(queuedIndex)
                return keep
            })

            const direction = Math.sign(index - previous) || 1
            enqueue(index, true)
            for (let distance = 1; distance <= 8; distance++) {
                enqueue(index + direction * distance)
                if (distance <= 4) enqueue(index - direction * distance)
            }
            pump()
        }

        function resizeCanvas() {
            const width = stage.clientWidth
            const height = stage.clientHeight
            const ratio = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.max(1, Math.round(width * ratio))
            canvas.height = Math.max(1, Math.round(height * ratio))
            context.setTransform(ratio, 0, 0, ratio, 0, 0)
            if (cache.has(target)) paint(target)
            else if (cache.has(painted)) paint(painted)
        }

        function updateFromScroll() {
            const rect = section.getBoundingClientRect()
            const travel = Math.max(1, rect.height - stage.clientHeight)
            const progress = reduceMotion.matches
                ? 0
                : clamp(-rect.top / travel, 0, 1)
            const next = Math.round(progress * (urls.length - 1))
            if (next !== target) {
                const previous = target
                target = next
                if (cache.has(target)) paint(target)
                preloadNearby(target, previous)
            }
        }

        function scheduleUpdate() {
            if (raf) return
            raf = window.requestAnimationFrame(() => {
                raf = 0
                updateFromScroll()
            })
        }

        const observer = new ResizeObserver(() => {
            resizeCanvas()
            scheduleUpdate()
        })
        observer.observe(stage)
        observer.observe(section)
        window.addEventListener("scroll", scheduleUpdate, { passive: true })
        window.addEventListener("resize", scheduleUpdate)
        reduceMotion.addEventListener("change", scheduleUpdate)

        resizeCanvas()
        updateFromScroll()
        preloadNearby(target, target)

        return () => {
            disposed = true
            window.cancelAnimationFrame(raf)
            window.removeEventListener("scroll", scheduleUpdate)
            window.removeEventListener("resize", scheduleUpdate)
            reduceMotion.removeEventListener("change", scheduleUpdate)
            observer.disconnect()
            queue = []
            queued.clear()
            cache.clear()
        }
    }, [urls, fit, backgroundColor, isStatic])

    const screens = clamp(Number(scrollScreens) || 4, 2, 12)
    const firstUrl = urls[0]

    return (
        <div
            ref={sectionRef}
            style={{
                ...style,
                width: "100%",
                height: `${screens * 100}svh`,
                backgroundColor,
            }}
        >
            <div
                ref={stageRef}
                role="img"
                aria-label={accessibleLabel}
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100svh",
                    overflow: "hidden",
                    backgroundColor,
                }}
            >
                {firstUrl ? (
                    <img
                        src={firstUrl}
                        alt=""
                        aria-hidden="true"
                        style={{
                            display: "block",
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: fit,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            display: "grid",
                            placeItems: "center",
                            width: "100%",
                            height: "100%",
                            color: "#f5f2ef",
                            font: "500 16px/1.5 sans-serif",
                            textAlign: "center",
                            padding: 24,
                        }}
                    >
                        Añade imágenes o configura una secuencia numerada.
                    </div>
                )}
                {!isStatic && firstUrl && (
                    <canvas
                        ref={canvasRef}
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>
        </div>
    )
}

ImageSequenceScrub.defaultProps = {
    sourceMode: "pattern",
    images: [],
    baseUrl: SILKY_BASE,
    filePrefix: "frame-",
    fileExtension: "webp",
    firstFrame: 1,
    frameCount: 150,
    padDigits: 4,
    scrollScreens: 4,
    fit: "contain",
    backgroundColor: "#080b14",
    accessibleLabel: "Animación de la paleta Silky Pro Palette controlada por desplazamiento",
}

addPropertyControls(ImageSequenceScrub, {
    sourceMode: {
        type: ControlType.Enum,
        title: "Origen",
        options: ["pattern", "images"],
        optionTitles: ["Numerada", "Imágenes"],
        defaultValue: "pattern",
    },
    images: {
        type: ControlType.Array,
        title: "Fotogramas",
        control: { type: ControlType.ResponsiveImage },
        maxCount: 300,
        hidden: (props) => props.sourceMode !== "images",
    },
    baseUrl: {
        type: ControlType.String,
        title: "Carpeta URL",
        defaultValue: SILKY_BASE,
        hidden: (props) => props.sourceMode !== "pattern",
    },
    filePrefix: {
        type: ControlType.String,
        title: "Prefijo",
        defaultValue: "frame-",
        hidden: (props) => props.sourceMode !== "pattern",
    },
    fileExtension: {
        type: ControlType.String,
        title: "Extensión",
        defaultValue: "webp",
        hidden: (props) => props.sourceMode !== "pattern",
    },
    firstFrame: {
        type: ControlType.Number,
        title: "Primer nº",
        defaultValue: 1,
        min: 0,
        max: 10000,
        step: 1,
        hidden: (props) => props.sourceMode !== "pattern",
    },
    frameCount: {
        type: ControlType.Number,
        title: "Cantidad",
        defaultValue: 150,
        min: 1,
        max: 400,
        step: 1,
        hidden: (props) => props.sourceMode !== "pattern",
    },
    padDigits: {
        type: ControlType.Number,
        title: "Dígitos",
        defaultValue: 4,
        min: 1,
        max: 8,
        step: 1,
        hidden: (props) => props.sourceMode !== "pattern",
    },
    scrollScreens: {
        type: ControlType.Number,
        title: "Scroll (pantallas)",
        defaultValue: 4,
        min: 2,
        max: 12,
        step: 0.25,
    },
    fit: {
        type: ControlType.Enum,
        title: "Ajuste",
        options: ["contain", "cover"],
        optionTitles: ["Completa", "Llenar"],
        defaultValue: "contain",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Fondo",
        defaultValue: "#080b14",
    },
    accessibleLabel: {
        type: ControlType.String,
        title: "Descripción",
        defaultValue:
            "Animación de la paleta Silky Pro Palette controlada por desplazamiento",
    },
})
