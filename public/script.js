const url="api/grads/";

let grads=[];

let xhrGetAll = new XMLHttpRequest();
xhrGetAll.open("GET", url, true);
xhrGetAll.send();

xhrGetAll.onload=()=>{
    console.log(xhrGetAll);
    grads = JSON.parse(xhrGetAll.response);
    if (xhrGetAll.readyState == 4 && xhrGetAll.status==200) {
        console.log(grads);
    } else{
        console.error("Error!")
    }
}

function renderGrads(){
    console.log("test")
    const gradList = grads.map(element => {
        return (
            "<li>"+
            element.name +
            " - Class of " + element.yearOfGraduation + "<br />"+
            element.role + " at " + element.company +
            "</li>"
        )});
            document.getElementById("results").innerHTML =
    "<ul>" + gradList.join('\n') + "</ul>";
}

function addGraduate(e){
    e.preventDefault();
    console.log("Submit clicked");
    
    let grad = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    }
    console.log(grad);

    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("POST", url);
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(grad));
}

