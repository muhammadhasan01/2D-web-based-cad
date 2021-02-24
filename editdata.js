function editData() {
    let button = document.getElementById("change-data");
    let place = document.getElementById("edit-data");
    if (button.innerHTML !== "Start Editing Data") {
        button.innerHTML = "Start Editing Data";
        place.style.display = "none";
        place.innerHTML = "";
        let coba = document.getElementsByClassName("edit");
        for (let i = 0; i < coba.length; i++) {
            coba[i].remove();
        }
        return;
    }
    let datas = [];
    for (let i = 0; i < globalData.length; i++) {
        let geo = globalData[i];
        if (geo.type === "polygon") continue;
        datas.push({
            index: i,
            type: geo.type,
        });
    }
    console.log(datas);
    if (datas.length === 0) return;
    button.innerHTML = "Stop Editing Data";
    place.style.display = 'block';
    let elements = [];
    datas.forEach((e) => {
        const name = e.type + "_" + e.index;
        let lbl = document.createElement("label");
        lbl.setAttribute("id", "label" + e.index);
        lbl.innerHTML = name + " scale";
        let inp = document.createElement("input");
        inp.setAttribute("id", "input" + e.index);
        inp.setAttribute("type", "text");
        inp.value = 1;
        elements.push(lbl, inp);
    });
    let btn = document.createElement("button");
    btn.innerHTML = "submit";
    elements.push(btn);
    let br = document.createElement("br");
    br.setAttribute("class", "edit");
    elements.forEach((e) => {
        e.setAttribute("class", "edit");
        place.appendChild(e);
        place.appendChild(br.cloneNode());
    });
    btn.onclick = function() {
        for (let id = 0; id < globalData.length; id++) {
            let lbl = document.getElementById("label" + id);
            let inp = document.getElementById("input" + id);
            console.log(lbl);
            console.log(inp);
            if (!lbl || !inp) continue;
            let scale = parseFloat(inp.value);
            console.log(scale);
            let geo = globalData[id];
            for (let i = 1; i < 4; i++) {
                geo.points[i].x = geo.points[0].x + (geo.points[i].x - geo.points[0].x) * scale;
                geo.points[i].y = geo.points[0].y + (geo.points[i].y - geo.points[0].y) * scale;
            }
        };
        console.log(globalData);
        renderObjects(globalData);
    };
}