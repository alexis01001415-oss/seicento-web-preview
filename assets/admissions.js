(() => {
  const tabs = [...document.querySelectorAll('[data-course-tab]')];
  const panels = [...document.querySelectorAll('[data-course-panel]')];
  const activateTab = (tab, focus = false) => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
    if (focus) tab.focus();
  };
  if (tabs.length) {
    document.querySelector('.course-tabs').hidden = false;
    activateTab(tabs[0]);
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        activateTab(tabs[next], true);
      });
    });
  }

  const form = document.querySelector('#admissions-form');
  if (!form) return;
  const field = name => form.elements.namedItem(name);
  const visitFields = document.querySelector('#visit-fields');
  const result = document.querySelector('#contact-result');
  const dateField = field('visit_date');
  const timeField = field('visit_time');
  const campusField = field('campus');
  const mexicoClock = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const updateTimes = () => {
    const now = Object.fromEntries(mexicoClock.formatToParts(new Date()).map(part => [part.type, part.value]));
    const today = `${now.year}-${now.month}-${now.day}`;
    const currentTime = `${now.hour}:${now.minute}`;
    dateField.min = today;
    const day = dateField.value ? new Date(dateField.value + 'T12:00:00Z').getUTCDay() : null;
    const weekend = day === 0 || day === 6;
    [...timeField.options].forEach(option => {
      const unavailable = (weekend && option.value > '16:00') ||
        (dateField.value === today && option.value <= currentTime);
      option.hidden = Boolean(option.value) && unavailable;
      option.disabled = !option.value || unavailable;
    });
    if (timeField.selectedOptions[0]?.disabled) timeField.value = '';
  };
  const updateIntent = () => {
    const visiting = field('intent').value === 'Visita guiada';
    visitFields.hidden = !visiting;
    dateField.disabled = timeField.disabled = !visiting;
    dateField.required = timeField.required = visiting;
    [...campusField.options].forEach(option => {
      const unavailable = visiting && ['En línea', 'Quiero orientación'].includes(option.value);
      option.hidden = unavailable;
      option.disabled = !option.value || unavailable;
    });
    if (campusField.selectedOptions[0]?.disabled) campusField.value = '';
    updateTimes();
    result.hidden = true;
  };
  form.querySelectorAll('[name="intent"]').forEach(radio => radio.addEventListener('change', updateIntent));
  dateField.addEventListener('change', updateTimes);
  field('name').addEventListener('input', () => field('name').setCustomValidity(''));
  field('phone').addEventListener('input', () => field('phone').setCustomValidity(''));
  form.addEventListener('input', () => { result.hidden = true; });
  form.addEventListener('change', () => { result.hidden = true; });

  document.querySelectorAll('[data-course]').forEach(link => link.addEventListener('click', () => {
    field('program').value = link.dataset.course;
    field('intent').value = 'Información';
    updateIntent();
  }));
  document.querySelectorAll('[data-visit]').forEach(link => link.addEventListener('click', () => {
    field('intent').value = 'Visita guiada';
    updateIntent();
  }));

  form.addEventListener('submit', event => {
    event.preventDefault();
    field('name').setCustomValidity(field('name').value.trim().length < 2 ? 'Escribe tu nombre para que podamos dirigirnos a ti.' : '');
    const phoneValue = field('phone').value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, '');
    field('phone').setCustomValidity(phoneDigits.length < 10 || phoneDigits.length > 15 || !/^\+?[\d\s().-]+$/.test(phoneValue) ? 'Escribe un teléfono de 10 a 15 dígitos, con lada si corresponde.' : '');
    updateTimes();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const lines = [
      'Hola, Seicento. Me gustaría recibir orientación.',
      '',
      `Nombre: ${String(values.get('name')).trim()}`,
      `Teléfono: ${String(values.get('phone')).trim()}`,
      `Consulta: ${values.get('intent')}`,
      `Programa: ${values.get('program')}`,
      `Campus: ${values.get('campus')}`,
    ];
    if (values.get('email')) lines.push(`Correo: ${String(values.get('email')).trim()}`);
    if (values.get('intent') === 'Visita guiada') {
      const date = new Date(values.get('visit_date') + 'T12:00:00');
      lines.push(`Visita propuesta: ${date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}, ${values.get('visit_time')} h (CDMX). Sujeta a confirmación.`);
    }
    if (String(values.get('message')).trim()) lines.push('', String(values.get('message')).trim());
    document.querySelector('#contact-draft').textContent = lines.join('\n');
    document.querySelector('#contact-whatsapp').href = `https://wa.me/525657907961?text=${encodeURIComponent(lines.join('\n'))}`;
    result.hidden = false;
    result.focus();
  });
  updateIntent();
  document.querySelector('#contact-submit').disabled = false;
})();
