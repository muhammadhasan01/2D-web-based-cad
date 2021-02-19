

// Load a data from a file JSON
// TODO: Implement Load Data
const loadData = () => {
    document.getElementById('inputfile') .addEventListener('change', function() { 
        var fr=new FileReader(); 
        fr.onload=function(){ 
            document.getElementById('output') 
                    .textContent=fr.result;
        } 
        fr.readAsText(this.files[0]); 
    })
};

loadData();