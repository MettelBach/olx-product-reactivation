document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const link = document.getElementById('link').value ?? 0;
    const continueProducts = parseInt(document.getElementById('productCount').value, 10);
    const inputFile = document.getElementById('code').value;

    const regexLink = /(.*\D)(\d{9})(.*)/;
    const matchLink = regexLink.exec(link);

    if (!matchLink) {
        alert('Zły link. Nie ma 9 cyfer.');
        return;
    }

    const linkStart = matchLink[1];
    const linkEnd = matchLink[3];

    const regexId = /<a href="\/d\/adding\/edit\/(\d+)\//g;

    const ids = [];
    let match;
    while ((match = regexId.exec(inputFile)) !== null) {
        ids.push(match[1]);
    }

    const links = ids.slice(continueProducts).map((id, index) => {
        return `<a href="${linkStart}${id}${linkEnd}" target="_blank" class="link-item">${++index}) ${linkStart}${id}${linkEnd}</a>`;
    });

    document.querySelector('.form-box').style.display = 'none';
    document.querySelector('.container').style.textAlign = 'center';
    const res = document.getElementById('result');
    res.innerHTML = links.join('<br>');
    res.style.cssText = 'text-align: center;min-width: 50vw;margin: auto;padding: 50px;background: #ffffff;border: 10px solid #f2f2f2;margin-bottom: 60px;';
});
