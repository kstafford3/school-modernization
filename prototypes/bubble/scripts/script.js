'use strict';

(function(that){
    d3.csv('data/data_master.csv', function(data){

        // Run the graph
        var bubble = new Bubble('MajorExp9815'); // data
        bubble.setData(data);
        bubble.graph(bubble.data);

        // To change the subdivides
        var subdivides = Array.prototype.slice.call(getAll('.subdivides'));
        subdivides.forEach(function(item, e){
            item.addEventListener('click', function(e){
                bubble.setColumn(e.target.id);
                bubble.graph(bubble.data);
            });
        });

        // To change the bubble radii
        var dataChange = Array.prototype.slice.call(getAll('.dataChange'));
        dataChange.forEach(function(item, e){
            item.addEventListener('click', function(e){  
                bubble.setBudget(e.target.id);
                bubble.graph(bubble.data);
            });
        });
    });
}(this))


// Utility functions
function get(sel){return document.querySelector(sel);}
function getAll(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel));}
function camel(str){ return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase();});}

        // Split up the data
        // var schools = (function(d){
        //     var temp = {};

        //     temp.both = d;
        //     temp.public = d.filter(function(item){
        //         if(item.Agency === 'DCPS'){ return item; }
        //     });
        //     temp.charter = d.filter(function(item){
        //         if(item.Agency === 'PCS'){ return item; }
        //     });

        //     return temp;

        // }(data));