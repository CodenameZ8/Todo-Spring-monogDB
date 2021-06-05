var x={
  "one":345,
  "two":43
}
function sampleHTTP()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("sample").innerHTML =
        this.responseText;
      }
    };
   
    xhttp.open("POST", "/sample", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(x));
  }
   
