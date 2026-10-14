import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type FramerImage = { src?: string; srcSet?: string; alt?: string }

type Props = {
    beforeImage?: FramerImage
    afterImage?: FramerImage
    initialPosition?: number
    fit?: "cover" | "contain"
    lineColor?: string
    handleColor?: string
    iconColor?: string
    handleSize?: number
    radius?: number
    accessibleLabel?: string
    style?: React.CSSProperties
}

const ASSETS =
    "https://alexis01001415-oss.github.io/seicento-web-preview/assets/makeup-comparison/"
const BEFORE = { src: ASSETS + "before-transparent.png" }
const AFTER = { src: ASSETS + "after-fantasy-transparent.png" }

function clamp(value: number) {
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 50
}

/**
 * Solo imágenes y deslizador. Sin textos visibles ni fondo añadido.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 900
 * @framerIntrinsicHeight 600
 */
export default function BeforeAfterComparison({
    beforeImage = BEFORE,
    afterImage = AFTER,
    initialPosition = 50,
    fit = "cover",
    lineColor = "#716875",
    handleColor = "#FFFFFF",
    iconColor = "#343137",
    handleSize = 48,
    radius = 0,
    accessibleLabel = "Comparativa de maquillaje antes y después",
    style,
}: Props) {
    const before = beforeImage?.src ? beforeImage : BEFORE
    const after = afterImage?.src ? afterImage : AFTER
    const [position, setPosition] = React.useState(() => clamp(initialPosition))
    const [keyboardFocus, setKeyboardFocus] = React.useState(false)
    const [beforeError, setBeforeError] = React.useState("")
    const [afterError, setAfterError] = React.useState("")
    const pointer = React.useRef<number | null>(null)

    React.useEffect(() => {
        setPosition(clamp(initialPosition))
    }, [initialPosition])

    const beforeKey = `${before.src}|${before.srcSet || ""}`
    const afterKey = `${after.src}|${after.srcSet || ""}`
    const beforeFailed = beforeError === beforeKey
    const afterFailed = afterError === afterKey
    const canCompare = !beforeFailed && !afterFailed
    // If an image fails, display the remaining image without a broken-image label.
    const split = beforeFailed ? 0 : afterFailed ? 100 : position
    const size = Math.max(44, Math.min(80, handleSize || 48))

    const imageStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: fit,
        objectPosition: "50% 50%",
        pointerEvents: "none",
        userSelect: "none",
    }

    function moveToPointer(event: React.PointerEvent<HTMLInputElement>) {
        const bounds = event.currentTarget.getBoundingClientRect()
        if (bounds.width > 0) {
            setPosition(clamp(((event.clientX - bounds.left) / bounds.width) * 100))
        }
    }

    function startDrag(event: React.PointerEvent<HTMLInputElement>) {
        if (!canCompare || !event.isPrimary || event.button !== 0) return
        event.preventDefault()
        event.currentTarget.focus({ preventScroll: true })
        setKeyboardFocus(false)
        pointer.current = event.pointerId
        event.currentTarget.setPointerCapture(event.pointerId)
        moveToPointer(event)
    }

    function endDrag(event: React.PointerEvent<HTMLInputElement>) {
        if (pointer.current !== event.pointerId) return
        pointer.current = null
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
    }

    return (
        <div
            style={{
                width: 900,
                height: 600,
                ...style,
                position: "relative",
                isolation: "isolate",
                overflow: "hidden",
                borderRadius: radius,
                background: "transparent",
                userSelect: "none",
            }}
        >
            {/* Both images are clipped: transparent pixels never reveal the other layer. */}
            <img
                key={afterKey}
                src={after.src}
                srcSet={after.srcSet}
                sizes="(max-width: 900px) 100vw, 900px"
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                onError={() => setAfterError(afterKey)}
                onLoad={() => setAfterError("")}
                style={{
                    ...imageStyle,
                    visibility: afterFailed ? "hidden" : "visible",
                    clipPath: `inset(0 0 0 ${split}%)`,
                }}
            />
            <img
                key={beforeKey}
                src={before.src}
                srcSet={before.srcSet}
                sizes="(max-width: 900px) 100vw, 900px"
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                onError={() => setBeforeError(beforeKey)}
                onLoad={() => setBeforeError("")}
                style={{
                    ...imageStyle,
                    visibility: beforeFailed ? "hidden" : "visible",
                    clipPath: `inset(0 ${100 - split}% 0 0)`,
                }}
            />
            {canCompare && (
                <>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${split}%`,
                            width: 2,
                            background: lineColor,
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.65)",
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                            opacity: split === 0 || split === 100 ? 0 : 1,
                        }}
                    />
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: `clamp(${size / 2 + 4}px, ${split}%, calc(100% - ${size / 2 + 4}px))`,
                            width: size,
                            height: size,
                            display: "grid",
                            placeItems: "center",
                            boxSizing: "border-box",
                            borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.85)",
                            background: handleColor,
                            color: iconColor,
                            boxShadow: keyboardFocus
                                ? `0 0 0 3px ${iconColor}, 0 0 0 6px ${handleColor}`
                                : "0 4px 20px rgba(0,0,0,0.13)",
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                        }}
                    >
                        <svg width="28" height="20" viewBox="0 0 32 20" fill="none">
                            <path
                                d="m10 5-5 5 5 5M22 5l5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </>
            )}
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={split}
                disabled={!canCompare}
                aria-label={accessibleLabel}
                aria-valuetext={`${Math.round(split)} % antes; ${100 - Math.round(split)} % después`}
                onChange={(event) => setPosition(clamp(Number(event.currentTarget.value)))}
                onPointerDown={startDrag}
                onPointerMove={(event) => {
                    if (pointer.current === event.pointerId) moveToPointer(event)
                }}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={() => { pointer.current = null }}
                onFocus={() => setKeyboardFocus(true)}
                onBlur={() => setKeyboardFocus(false)}
                onKeyDown={() => setKeyboardFocus(true)}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    display: "block",
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    opacity: 0,
                    cursor: canCompare ? "ew-resize" : "default",
                    touchAction: "pan-y pinch-zoom",
                    direction: "ltr",
                }}
            />
        </div>
    )
}

BeforeAfterComparison.defaultProps = {
    beforeImage: BEFORE,
    afterImage: AFTER,
    initialPosition: 50,
    fit: "cover",
    lineColor: "#716875",
    handleColor: "#FFFFFF",
    iconColor: "#343137",
    handleSize: 48,
    radius: 0,
    accessibleLabel: "Comparativa de maquillaje antes y después",
}

addPropertyControls(BeforeAfterComparison, {
    beforeImage: { type: ControlType.ResponsiveImage, title: "Antes" },
    afterImage: { type: ControlType.ResponsiveImage, title: "Después" },
    initialPosition: {
        type: ControlType.Number, title: "Posición", min: 0, max: 100,
        step: 1, unit: "%", defaultValue: 50,
    },
    fit: {
        type: ControlType.Enum, title: "Ajuste", options: ["cover", "contain"],
        optionTitles: ["Cubrir", "Contener"], defaultValue: "cover",
    },
    lineColor: { type: ControlType.Color, title: "Línea", defaultValue: "#716875" },
    handleColor: { type: ControlType.Color, title: "Control", defaultValue: "#FFFFFF" },
    iconColor: { type: ControlType.Color, title: "Flechas", defaultValue: "#343137" },
    handleSize: {
        type: ControlType.Number, title: "Tamaño", min: 44, max: 80,
        step: 1, unit: "px", defaultValue: 48,
    },
    radius: {
        type: ControlType.Number, title: "Radio", min: 0, max: 80,
        step: 1, unit: "px", defaultValue: 0,
    },
    accessibleLabel: {
        type: ControlType.String, title: "Accesibilidad",
        defaultValue: "Comparativa de maquillaje antes y después",
        description: "Solo para lectores de pantalla. No aparece en la página.",
    },
})
