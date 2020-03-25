function myLogin() {
    let xhr = new XMLHttpRequest();

    let body = 'password='+document.getElementById('psw').value + '&email=' + document.getElementById('em').value

    xhr.open("POST", '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


    xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
        document.getElementById('hello').innerHTML = xhr.responseText;
    };

    xhr.send(body);
}




// async function myLogin() {
//     fetch('/login', {
//         method: 'post',
//         headers: {
//             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//         },
//         body: 'password='+document.getElementById('psw').value + '&email=' + document.getElementById('em').value
//     })
//
//
//
//         .then(function (data) {
//             console.log(data.text());
//             //document.getElementById('hello').innerHTML = data.req.body;
//         })
//
//         .catch(function (error) {
//             console.log('Request failed', error);
//         });
//
//     // const response = await fetch('/login');
//     // console.log(response);
// }
