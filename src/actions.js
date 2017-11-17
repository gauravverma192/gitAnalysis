import Axios from "./axios.js"

const Actions = {
    ajaxCall(url, callback) {
        Axios.get(url)
            .then(function (response) {
                callback(response);
            })
            .catch( function(error) {
                
            })
    },

    getDocumentScrollValues() {
      var el = {};
      el.scrollHeight = Math.max(window.innerHeight,document.documentElement.scrollHeight);
      el.scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      el.clientHeight = Math.max(document.body.clientHeight,document.documentElement.clientHeight);
      return el;
    },

    sortArrayWithSecondValue(data) {
        console.log("sort incom : ", data);
        var keys = [], value = [];
        for (var key in data) {
                for(var i in data[key]) {
                    keys.push(i);
                    value.push(data[key][i]);
                }
            }
        console.log("sort keys : ", keys);
        console.log("sort value : ", value);
        var sortedData = this.bubbleSort(keys, value);
        return sortedData; 
    },

    bubbleSort(key, items) {
        console.log("income sort keys : ", key);
        console.log("income sort values : ", items);
        var length = items.length;
        for (var i = (length - 1); i >= 0; i--) {
            //Number of passes
            for (var j = (length - i); j > 0; j--) {
                //Compare the adjacent positions
                if (items[j] > items[j - 1]) {
                    //Swap the numbers
                    var tmp = items[j];
                    items[j] = items[j - 1];
                    items[j - 1] = tmp;
                    tmp = key[j];
                    key[j] = key[j - 1];
                    key[j - 1] = tmp;
                }
            }
        }
        console.log("after sort keys : ", key);
        console.log("after sort values : ", items);
        var returnData = [{}];
        for (var i = 0; i < items.length; i++) {
            var temp = {'text' : key[i], 'value' : items[i]};
            returnData.push(temp);
        }
        console.log("return data : ", returnData);
        return returnData;
    }
}

export default Actions;
// function ajaxCall(url, method, getResponse) {
//         var request = new XMLHttpRequest();

//         request.overrideMimeType("application/json");
//         request.open(method, url, true);
//         request.onreadystatechange = function () {
//             if (this.readyState === 4) {
//                 if (this.status === 200) {
//                     getResponse = { status: this.status, body: this.responseText };
//                 } else {
//                     getResponse = { status: this.status, body: this.responseText };
//                 }
//             }
//         };

//         request.send();
// }



