const DetailView = (() => {
  let entryId = null;

  function render(container, id) {
    entryId = id;
    const entry = Store.getEntry(id);
    if (!entry) {
      container.innerHTML = `
        <div class="detail-view">
          <div class="detail-header">
            <button class="back-btn" id="back-btn">&larr; Back</button>
          </div>
          <div class="empty-state">Entry not found.</div>
        </div>
      `;
      container.querySelector('#back-btn').addEventListener('click', () => {
        window.location.hash = '#/history';
      });
      return;
    }

    const d = entry.details || {};
    const time = new Date(entry.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });
    const date = new Date(entry.timestamp).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });

    container.innerHTML = `
      <div class="detail-view">
        <div class="detail-header">
          <button class="back-btn" id="back-btn">&larr; Back</button>
          <div class="detail-title">${date} at ${time}</div>
        </div>

        <section class="detail-section">
          <label class="detail-label">Severity</label>
          <div class="severity-selector" id="severity-selector">
            ${[1, 2, 3, 4, 5].map(n => `
              <button class="severity-btn${d.severity === n ? ' selected' : ''}" data-value="${n}">${n}</button>
            `).join('')}
          </div>
        </section>

        <section class="detail-section">
          <label class="detail-label">Duration</label>
          <div class="duration-input">
            <input type="number" id="duration-hours" class="duration-field" min="0" max="72" placeholder="0" value="${d.duration_minutes ? Math.floor(d.duration_minutes / 60) : ''}"> <span class="duration-unit">hr</span>
            <input type="number" id="duration-minutes" class="duration-field" min="0" max="59" placeholder="0" value="${d.duration_minutes ? d.duration_minutes % 60 : ''}"> <span class="duration-unit">min</span>
          </div>
        </section>

        <section class="detail-section">
          <label class="detail-label">Symptoms</label>
          <div class="chip-group" id="symptom-chips"></div>
        </section>

        <section class="detail-section">
          <label class="detail-label">Triggers</label>
          <div class="chip-group" id="trigger-chips"></div>
        </section>

        <section class="detail-section">
          <label class="detail-label">Medications</label>
          <div class="chip-group" id="medication-chips"></div>
        </section>

        <section class="detail-section">
          <label class="detail-label">Notes</label>
          <textarea class="notes-field" id="notes-field" placeholder="How did it feel? What helped?">${d.notes || ''}</textarea>
        </section>
      </div>
    `;

    bindEvents(entry);
  }

  function renderChips(containerId, options, selected) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = options.map(opt => `
      <button class="chip${selected.includes(opt) ? ' selected' : ''}" data-value="${opt}">${opt}</button>
    `).join('');
  }

  function setupChipToggle(containerId, field, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      const value = btn.dataset.value;
      const current = [...(Store.getEntry(entryId).details[field] || [])];
      const idx = current.indexOf(value);
      if (idx === -1) current.push(value);
      else current.splice(idx, 1);
      saveField(field, current);
      renderChips(containerId, options, current);
    });
  }

  function renderMedicationChips(selected) {
    const presets = ['Ibuprofen', 'Sumatriptan', 'Acetaminophen', 'Naproxen'];
    const custom = Store.getCustomMedications();
    const allMeds = [...presets, ...custom.filter(m => !presets.includes(m))];

    const container = document.getElementById('medication-chips');
    if (!container) return;

    container.innerHTML = allMeds.map(opt => `
      <button class="chip${selected.includes(opt) ? ' selected' : ''}" data-value="${opt}">${opt}</button>
    `).join('') + `<button class="chip chip-add" id="add-med-btn">+ Custom</button>`;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;

      if (btn.id === 'add-med-btn') {
        promptCustomMedication();
        return;
      }

      const value = btn.dataset.value;
      toggleMedication(value);
    });
  }

  function promptCustomMedication() {
    // Show inline modal instead of window.prompt()
    const existing = document.getElementById('med-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'med-modal';
    modal.className = 'inline-modal-overlay';
    modal.innerHTML = `
      <div class="inline-modal">
        <div class="inline-modal-title">Add Medication</div>
        <input type="text" id="med-modal-input" class="inline-modal-input" placeholder="Medication name" autocomplete="off">
        <div class="inline-modal-actions">
          <button class="inline-modal-btn cancel" id="med-modal-cancel">Cancel</button>
          <button class="inline-modal-btn confirm" id="med-modal-confirm">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('med-modal-input');
    input.focus();

    function submit() {
      const name = input.value.trim();
      modal.remove();
      if (!name) return;
      Store.addCustomMedication(name);
      const entry = Store.getEntry(entryId);
      const meds = entry.details.medications || [];
      if (!meds.includes(name)) {
        meds.push(name);
        saveField('medications', meds);
      }
      renderMedicationChips(meds);
    }

    document.getElementById('med-modal-confirm').addEventListener('click', submit);
    document.getElementById('med-modal-cancel').addEventListener('click', () => modal.remove());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  function toggleMedication(value) {
    const entry = Store.getEntry(entryId);
    const meds = [...(entry.details.medications || [])];
    const idx = meds.indexOf(value);
    if (idx === -1) {
      meds.push(value);
    } else {
      meds.splice(idx, 1);
    }
    saveField('medications', meds);
    renderMedicationChips(meds);
  }

  function saveField(field, value) {
    const entry = Store.getEntry(entryId);
    if (!entry) return;
    const details = { ...entry.details, [field]: value };
    Store.updateEntry(entryId, { details });
  }

  function bindEvents(entry) {
    const d = entry.details || {};

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
      window.location.hash = '#/history';
    });

    // Severity
    document.getElementById('severity-selector').addEventListener('click', (e) => {
      const btn = e.target.closest('.severity-btn');
      if (!btn) return;
      const value = parseInt(btn.dataset.value);
      saveField('severity', value);
      document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });

    // Duration
    const hoursInput = document.getElementById('duration-hours');
    const minutesInput = document.getElementById('duration-minutes');
    function saveDuration() {
      const h = parseInt(hoursInput.value) || 0;
      const m = parseInt(minutesInput.value) || 0;
      const total = h * 60 + m;
      saveField('duration_minutes', total || null);
    }
    hoursInput.addEventListener('change', saveDuration);
    minutesInput.addEventListener('change', saveDuration);

    // Symptom chips
    const symptoms = ['Aura', 'Nausea', 'Light sensitivity', 'Sound sensitivity', 'Neck pain', 'Fatigue'];
    renderChips('symptom-chips', symptoms, d.symptoms || []);
    setupChipToggle('symptom-chips', 'symptoms', symptoms);

    // Trigger chips
    const triggers = ['Poor sleep', 'Stress', 'Food', 'Weather', 'Hormonal', 'Alcohol', 'Caffeine', 'Dehydration'];
    renderChips('trigger-chips', triggers, d.triggers || []);
    setupChipToggle('trigger-chips', 'triggers', triggers);

    // Medication chips
    renderMedicationChips(d.medications || []);

    // Notes
    document.getElementById('notes-field').addEventListener('input', (e) => {
      saveField('notes', e.target.value);
    });
  }

  return { render };
})();
