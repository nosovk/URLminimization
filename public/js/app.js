function originalLink() {
    let xhr = new XMLHttpRequest();

    let body = 'OriginalName=' + document.getElementsByName('url')[0].value;

    xhr.open("POST", '/api', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


    xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
       //document.getElementsByName('temp')[0].innerHTML = 'sss';
        document.getElementById('response').innerHTML = xhr.responseText;
    };

    xhr.send(body);
}



