
var bookmark = document.getElementById("bookmark");
var sitUrl = document.getElementById("sitUrl");


var siteList = [];

if (JSON.parse(localStorage.getItem("siteList")) !== null) {
    siteList = JSON.parse(localStorage.getItem("siteList"));

    dispaly(siteList);
}


function addSite() {
    if (validation()) {
        var sitObj = {
            id: Date.now(),
            bookmark: bookmark.value,
            sitUrl: sitUrl.value
        };


        siteList.push(sitObj);
        localStorage.setItem("siteList", JSON.stringify(siteList));
        dispaly(siteList);


    }


}

function dispaly(siteList) {
    var box = "";

    for (var i = 0; i < siteList.length; i++) {
        box += `<tr>
            <th scope="row">${siteList[i].id}</th>
            <td>${siteList[i].bookmark}</td>
            <td><button onclick="Visit('${siteList[i].sitUrl}')" class="btn btn-info"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button onclick="Delete(${siteList[i].id})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
          </tr>`
    }

    document.getElementById("myTbody").innerHTML = box;
}


function validation() {

    var regex = {
        sitUrl: /^(https:\/\/www.|http:\/\/www.)[a-z]+[.com]+.*$/,
        bookmark: /^[a-zA-Z\s]{4,}$/
    }

    if (regex[bookmark.id].test(bookmark.value) && regex[sitUrl.id].test(sitUrl.value) && toString(bookmark.value) !== "" && toString(sitUrl.value) !== "") {
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return true;
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Plese Check Your site name or site url",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return false;


    }



}


function Delete(id) {
    for (var i = 0; i < siteList.length; i++) {

        if (id === siteList[i].id) {
            siteList.splice(i, 1);
        }
    }
    localStorage.setItem("siteList", JSON.stringify(siteList));
    dispaly(siteList);

}


function Visit(url) {
    window.location.href = url;

}


