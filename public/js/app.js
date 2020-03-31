function originalLink() {
    let xhr = new XMLHttpRequest();

    let body = 'OriginalName=' + document.getElementsByName('url')[0].value;

    xhr.open("POST", '/api/url/shorten', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


    xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
       //document.getElementsByName('temp')[0].innerHTML = 'sss';
        document.getElementById('response').innerHTML = xhr.responseText;
    };

    xhr.send(body);
}

// let token =
// fetch(url, {
//     method: 'GET',
//     headers: new Headers({
//         'Authorization': 'Bearer ' + token,
//         'Content-Type': 'application/json'
//     }),
//     body: { /* some data */ }
// });



