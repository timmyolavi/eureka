
// Norton
document.getElementById('norton').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    let score = 0;
    score += parseInt(form.physicalCondition.value);
    document.getElementById('norton-result').textContent = `Total poäng: ${score}`;
});

// Droppkalkylator
document.getElementById('dropp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const volume = parseFloat(form.volume.value);
    const time = parseFloat(form.time.value);
    const factor = parseFloat(form.factor.value);
    const dropsPerMinute = (volume * factor) / (time * 60);
    document.getElementById('dropp-result').textContent = `Droppar per minut: ${dropsPerMinute.toFixed(2)}`;
});

// Urinproduktion
document.getElementById('urine-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const weight = parseFloat(form.weight.value);
    const target = parseFloat(form.target.value);
    const requiredOutput = weight * target;
    document.getElementById('urine-result').textContent = `Mål urinproduktion per timme: ${requiredOutput.toFixed(2)} ml`;
});

// Patientmodul
let patients = JSON.parse(localStorage.getItem('patients')) || [];

function savePatients() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('lastSave', Date.now());
}

function clearPatients() {
    localStorage.removeItem('patients');
    localStorage.removeItem('lastSave');
    patients = [];
    renderPatients();
}

function renderPatients() {
    const list = document.getElementById('patient-list');
    list.innerHTML = '';
    patients.forEach(patient => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${patient.bed}: ${patient.name}</h3>
            <p><strong>Situation:</strong> ${patient.situation}</p>
            <p><strong>Bakgrund:</strong> ${patient.background}</p>
            <p><strong>In/ut-farter:</strong> ${patient.lines}</p>
            <ul>${patient.checklist.map(item => `<li><input type="checkbox"> ${item}</li>`).join('')}</ul>
        `;
        list.appendChild(div);
    });
}

document.getElementById('patient-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const patient = {
        bed: form.bed.value,
        name: form.name.value,
        situation: form.situation.value,
        background: form.background.value,
        lines: form.lines.value,
        checklist: form.checklist.value.split(',').map(item => item.trim())
    };
    patients.push(patient);
    savePatients();
    renderPatients();
    form.reset();
});

// Auto-radera efter 24h
setInterval(() => {
    const now = Date.now();
    const lastSave = localStorage.getItem('lastSave');
    if (lastSave && now - lastSave > 24 * 60 * 60 * 1000) {
        clearPatients();
    }
}, 60 * 1000);

renderPatients();
