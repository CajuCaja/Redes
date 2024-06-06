const cableData = [
    { distance: 100,        connector: 'RJ45',          standard: '10Base-T',                   type: 'Par trançado (CAT3 ou superior)',    maxDistance: '100 m',       speed: '10 Mbps' },
       { distance: 40000,   connector: 'LC',            standard: '10GBase-ER',                 type: 'Fibra: Monomodo',                    maxDistance: '40 km',       speed: '10 Gbps' }
       { distance: 100,     connector: 'RJ45',          standard: '100Base-TX (Fast Ethernet)', type: 'Par trançado (CAT5 ou superior)',    maxDistance: '100m',        speed:'100 Mbps'},
       { distance: 1000,    connector: 'RJ45',          standard: '1000Base-T',                 type: 'Par trançado (CAT5 e/ou superior)',  maxDistance: '100m',        speed:'1Gbps'},
       { distance: 10,      connector: 'RJ45',          standard: '10GBase-T',                  type: 'Par trançado (CAT6a ou Superior)',   maxDistance: '100m',        speed:'10Gbps'},
       { distance: 100,     connector: 'SC OU LC',      standard: '100Base-FX',                 type: 'Multimodo',                          maxDistance: '2km' ,        speed:'100Mbps'},
       { distance: 1000,    connector: 'SC ou LC',      standard: '1000Base-SX',                type: 'Multimodo',                          maxDistance: '550m',        speed:'1 Gbps'}, 
       { distance: 1000,    connector: 'SC ou LC',      standard: '1000Base-LX',                type: 'Monomodo (compatível com multimodo)',maxDistance: '10km',        speed:'1Gbps'},
       { distance: 10,      connector: 'LC',            standard: '10GBase-SR',                 type: 'Multimodo',                          maxDistance: '300m',        speed:'10Gbps'},
       { distance: 10,      connector: 'LC',            standard: '10GBase-LR',                 type: 'Monomodo',                           maxDistance: '10km',        speed:'10 Gbps'},
       { distance: 40,      connector: 'MPO',           standard: '40GBase-SR4',                type: 'Multimodo',                          maxDistance: '150m',        speed:'40 Gbps'},
       { distance: 100,     connector: 'MPO',           standard: '100GBase-SR10',              type: 'Multimodo',                          maxDistance: '100m',        speed:'100 Gbps'},
       { distance: 400,     connector: 'MPO',           standard: '400GBASE-R',                 type: 'Monomodo',                           maxDistance: '10 km (dependendo da implementação específica e tecnologia utilizada)', speed:' 400 Gbps'},
       { distance: 10,      connector: 'LC',            standard: '10GBase-ER',                 type: 'Monomodo',                           maxDistance: '40km',        speed:' 400 Gbps'},
       { distance: 40,      connector: 'MPO',           standard: '40GBase-LR4',                type: 'Monomodo',                           maxDistance: '10km',        speed:'10 Gbps'},
       { distance: 100,     connector: 'MPO',           standard: '100GBase-LR4',               type: 'Monomodo',                           maxDistance: '10km',        speed:' 100 Gbps'}

];     

document.getElementById('distance').addEventListener('change', function() {
    const distance = parseInt(this.value);
    const connectorSelect = document.getElementById('connector');
    connectorSelect.innerHTML = '<option value="">--Selecione o Conector--</option>';

    if (!isNaN(distance)) {
        const connectors = [...new Set(cableData.filter(cable => cable.distance === distance).map(cable => cable.connector))];
        connectors.forEach(connector => {
            const option = document.createElement('option');
            option.value = connector;
            option.textContent = connector;
            connectorSelect.appendChild(option);
        });

        connectorSelect.disabled = false;
    } else {
        connectorSelect.disabled = true;
    }

    updateTable([]);
});

document.getElementById('connector').addEventListener('change', function() {
    const distance = parseInt(document.getElementById('distance').value);
    const connector = this.value;

    if (!isNaN(distance) && connector) {
        const filteredCables = cableData.filter(cable => cable.distance === distance && cable.connector === connector);
        updateTable(filteredCables);
    } else {
        updateTable([]);
    }
});

function updateTable(cables) {
    const tbody = document.getElementById('resultsTable').querySelector('tbody');
    tbody.innerHTML = '';

    cables.forEach(cable => {
        const row = document.createElement('tr');
        Object.values(cable).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}
