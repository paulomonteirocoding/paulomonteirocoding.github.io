document.addEventListener('DOMContentLoaded', () => {
    fetch('./ListaDePrecos.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            let parsedArray = [];
            for(let i = 1; i < jsonData.length; i++){
                const rowObj = {};
                for(let j = 0; j < jsonData[0].length; j++){
                    rowObj[jsonData[0][j]] = jsonData[i][j];
                }
                parsedArray.push(rowObj);
            }

            populateTable(parsedArray);

            // Add filter functionality
            document.getElementById('filter-input').addEventListener('input', (event) => {
                filterTable(event.target.value, parsedArray);
            });

            // Add event listener for closing the overlay
            document.getElementById('close-button').addEventListener('click',handleOverlayClose());

            // Add event listener for form submission (you can customize the behavior here)
            document.getElementById('contact-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const phoneNumber = '351966786468';
                const message = `Nome: ${document.querySelector('input#name').value}
Email: ${document.querySelector('input#email').value}
Assunto: ${document.querySelector('input#subject').value}
Mensagem:\n${document.querySelector('textarea#message').value}`;
                const encodedMessage = encodeURIComponent(message);
                const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(url, '_blank').focus()
                document.getElementById('overlay').style.display = 'none';
                document.querySelector('input#name').value = '';
                document.querySelector('input#email').value = '';
                document.querySelector('input#subject').value = '';
                document.querySelector('textarea#message').value = '';
            });
        })
        .catch(error => console.error('Error fetching the Excel file:', error));
});



function populateTable(data) {
    const tableHead = document.getElementById('table-head');
    tableHead.innerHTML = '';
    tableHead.innerText = '';
    
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    tableBody.innerText = '';
    
    if(data.length > 0){
        // Create table headers
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        for(let i = 0; i < data.length; i++){
            const row = document.createElement('tr');
            for(let j = 0; j < headers.length; j++){
                const cellData = data[i][headers[j]];
                const td = document.createElement('td');
                if (cellData === true || cellData === 'true') {
                    td.innerHTML = '<i class="fas fa-check"></i>';
                } else if (cellData === false || cellData === 'false') {
                    td.innerHTML = '<i class="fas fa-times"></i>';
                } else if (headers[j] === 'Observações') {
                    td.innerHTML = formatObservacoes(cellData);
                } else if (headers[j] === 'Valor') {
                    td.innerHTML = cellData + '€';
                } else {
                    td.textContent = cellData;
                }
                row.appendChild(td);
            }
            row.addEventListener('click', () =>{
                showOverlay(`Pedido de cotação: ${data[i][headers[0]]} | ${data[i][headers[1]]} | ${data[i][headers[2]] }`)
            });
            tableBody.appendChild(row);
        }
    }
}
function filterTable(filterValue, data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    const headers = Object.keys(data[0]);
    populateTable(data.filter(value =>
        value['Familia'].toString().toLowerCase().includes(filterValue.toLowerCase())
        || value['Grupo']?.toString().toLowerCase().includes(filterValue.toLowerCase())
        || value['Serviço']?.toString().toLowerCase().includes(filterValue.toLowerCase())
    ));
}

function formatObservacoes(cellData) {
    const regex = /\[(.*?)\](.*)/;
    const match = regex.exec(cellData);

    if (match) {
        const items = match[1].split('|').map(item => item.trim());
        const globalObservacao = match[2].trim();
        const ul = document.createElement('ul');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        const p = document.createElement('p');
        p.textContent = globalObservacao;
        return ul.outerHTML + p.outerHTML;
    } else {
        return cellData;
    }
}

function showOverlay(subject) {
    document.getElementById('subject').value = subject;
    document.getElementById('overlay').style.display = 'flex';
}

function handleOverlayClose() {
    document.getElementById('overlay').style.display = 'none';
}
