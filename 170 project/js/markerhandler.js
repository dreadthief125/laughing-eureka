AFRAME.registerComponent("markerhandler", {
  init: async function() {
    var toys = await this.getToys();

    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;
      this.handleMarkerFound(toys, markerId);
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function(toys, markerId) {
 
    var buttonDiv = document.getElementById("button-div");
   // Changing button div visibility
    buttonDiv.style.display = "";

    var orderButtton = document.getElementById("order-button");
    var orderSummaryButtton = document.getElementById("order-summary-button");

    // Handling Click Events for orderButton and orderSummaryButton

   
    var toy = toys.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);
  },
  getToys: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  handleMarkerLost: function() {

    var buttonDiv = document.getElementById("button-div");
        // Changing button div visibility
    buttonDiv.style.display = "";
  }
});
