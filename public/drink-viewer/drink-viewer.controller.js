(function() { 'use strict';

angular.module('drink-db')
.controller('DrinkViewerController', DrinkViewerController);

DrinkViewerController.$inject = ['AuthService','DrinkFactory'];

function DrinkViewerController(AuthService,DrinkFactory) {
  
  var vm = this;

  vm.hello = 'Welcome to the Drink Viewer!';
  vm.drinkTree = {
    name:"Types of Drinks",
    parent:"null",
    children:[]
  };
  vm.getDrinks = getDrinks;
  vm.transformDrinks = transformDrinks;
  vm.doD3Shit = doD3Shit;

  function getDrinks(){
    DrinkFactory.getDrinks(transformDrinks,errorCallback)
  };

  function errorCallback(data) {
    console.log(data);
  };

  function transformDrinks(drinks){

    // Get all drink types
    for (var i=0; i<drinks.length; i++){

      var addNewType = true;
      var newChild = {
        name:"",
        parent:""
      };

      if (vm.drinkTree.children.length > 0){
        for (var j=0; j<vm.drinkTree.children.length; j++){
          if (vm.drinkTree.children[j].name == drinks[i].type){
            addNewType = false;
            break;
          }
        }
        if (addNewType){
          newChild.name = drinks[i].type;
          newChild.parent = "Types of Drinks";
          vm.drinkTree.children.push(newChild);
        }
      } else {
          newChild.name = drinks[i].type;
          newChild.parent = "Types of Drinks";
          vm.drinkTree.children.push(newChild);
      }
    }

    // Get all drink names
    for (var i=0; i<drinks.length; i++){

      var newChild = {
        name:"",
        parent:""
      };

      for (var j=0; j<vm.drinkTree.children.length; j++){
        if (drinks[i].type === vm.drinkTree.children[j].name){
          if (!vm.drinkTree.children[j].hasOwnProperty('children')){
            vm.drinkTree.children[j].children = [];
          }

          newChild.name = drinks[i].name + ': ' + drinks[i].style;
          newChild.parent = vm.drinkTree.children[j].name;
          vm.drinkTree.children[j].children.push(newChild);
        }
      }
    }

    doD3Shit();

  };


  getDrinks();

  function doD3Shit(){
    var margin = {top: 0, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("#drinkTree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.json("/hello-json", function(json) {
      root = vm.drinkTree;

      root.x0 = height / 2;
      root.y0 = 0;

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      root.children.forEach(collapse);

      update(root);
    //});

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click);

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 4.5)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  };

}

})();