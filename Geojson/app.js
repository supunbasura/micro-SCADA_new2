var map = new maplibregl.Map({
  container: "map",
  style:
    // "https://api.maptiler.com/maps/f127a423-ce73-4239-a17c-6b50d04a6aba/style.json?key=Fhf8j4FaMBagnMJ38nq9",
    "https://api.maptiler.com/maps/streets-v2/style.json?key=Fhf8j4FaMBagnMJ38nq9",
  center: [81.001, 7.904],
  zoom: 6.81,
  hash: true,
});

map.setZoom(6.36);

var geojsonFiles = [
  "./JSON/dist.geojson",
  "./JSON/dist_lines.geojson",
  "./JSON/central-regions.geojson",
  "./JSON/peradeniya.geojson",
];
let triangleMarker1, triangleMarker2, triangleMarker3;
var colorMapping = {
  "distribution division 1": "#006e87",
  "distribution division 2": "#009e87",
  "distribution division 3": "#fffab6",
  "distribution division 4": "#cc6666",
  "transmission division": "#ff5733",
  "Central Province - I": "#e6e6fa",
  "Eastern Province": "#98fb98",
  "Western Province - North": "#ffdab9",
  "Central Province - II": "#afeeee",
  "33 kV Line": "#e6e6fa",
  "C1 - Mathale": "#EA1A56",
  "C2 - Katugasthota": "#9EA1CB",
  "C3 - Kundasale": "#e6e6fa",
  "C4 - Peradeniya": "#E1A792",
  "C7 - Kandy City": "#D6EC5D",
  "C8 - Dambulla": "#2591E1",
  "C10 - Galagedara": "#E15825",
};

var popup = new maplibregl.Popup({
  closeButton: false,
  closeOnClick: false,
});

var selectedLayer = "none";

function selectLayer(layer) {
  // Remove the "selected" class from all buttons
  var buttons = document.querySelectorAll(".layer-button");
  buttons.forEach(function (button) {
    button.classList.remove("selected");
  });

  // Add the "selected" class to the clicked button
  var selectedButton = document.getElementById(layer + "Button");
  selectedButton.classList.add("selected");
  if (layer !== "none") {
    var geojsonFile =
      layer === "polygons" ? "./JSON/dist.geojson" : "./JSONdist_lines.geojson";

    map.addSource("dd", {
      type: "geojson",
      data: geojsonFile,
    });

    map.addLayer({
      id: "polygons",
      type: "fill",
      source: "dd",
      layout: {},
      paint: {
        "fill-color": [
          "match",
          ["get", "name"],
          "DD1",
          colorMapping["distribution division 1"],
          "DD2",
          colorMapping["distribution division 2"],
          "DD3",
          colorMapping["distribution division 3"],
          "DD4",
          colorMapping["distribution division 4"],
          "Central - I",
          colorMapping["Central Province - I"],
          "Eastern",
          colorMapping["Eastern Province"],
          "Western - North",
          colorMapping["Western Province - North"],
          "Central - II",
          colorMapping["Central Province - II"],
          "C1 - Mathale",
          colorMapping["C1 - Mathale"],
          "C2 - Katugasthota",
          colorMapping["C2 - Katugasthota"],
          "C3 - Kundasale",
          colorMapping["C3 - Kundasale"],
          "C4 - Peradeniya",
          colorMapping["C4 - Peradeniya"],
          "C7 - Kandy City",
          colorMapping["C7 - Kandy City"],
          "C8 - Dambulla",
          colorMapping["C8 - Dambulla"],
          "C10 - Galagedara",
          colorMapping["C10 - Galagedara"],
          "#afeeee",
        ],
        "fill-opacity": 0.5,
      },
    });

    map.addLayer({
      id: "off-leash-areas",
      type: "symbol",
      source: "dd",
      layout: {
        "text-field": ["format", ["get", "name"]],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top",
      },
    });

    map.addLayer({
      id: "polygons-outline",
      type: "line",
      source: "dd",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000000",
        "line-width": 1,
        "line-dasharray": [3, 3], // Set the dash pattern to [2, 2] for a dotted line
      },
    });

    map.on("mousemove", "polygons", function (e) {
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.lngLat;
      var name = e.features[0].properties.name;

      popup
        .setLngLat(coordinates)
        .setHTML("<h3>" + name + "</h3>")
        .addTo(map);
    });

    map.on("mouseleave", "polygons", function () {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    if (layer === "polygons") {
      map.on("click", "polygons", function (e) {
        var name = e.features[0].properties.name;

        var currentIndex = 0;

        if (name === "DD2") {
          // Set the center and zoom for Distribution Division 2
          map.flyTo({
            center: [81.071, 7.754],
            zoom: 7.478,
          });

          // Show the back button
          document.getElementById("backButton").style.display = "block";

          // Change the GeoJSON file to dist_lines.geojson
          map.getSource("dd").setData("./JSON/dist_lines.geojson");

          function goBack() {
            // Reset the map view to the initial state
            map.flyTo({
              center: [81.001, 7.904],
              zoom: 6.81,
            });

            // Hide the back button
            document.getElementById("backButton").style.display = "none";

            // Hide the Distribution Line Section
            document.getElementById("distributionLineSection").style.display =
              "block";

            // Change the GeoJSON file back to dist.geojson
            map.getSource("dd").setData("./JSON/dist.geojson");
          }

          document
            .getElementById("backButton")
            .addEventListener("click", function () {
              goBack();
            });
        }

        if (name === "Central - I") {
          // Set the center and zoom for Distribution Division 2
          map.flyTo({
            center: [80.8337, 7.5548],
            zoom: 8.82,
          });

          // Show the back button
          document.getElementById("backButton").style.display = "block";

          // Change the GeoJSON file to dist_lines.geojson
          // map.getSource("dd").setData("./JSON/central-regions.geojson");
          map.getSource("dd").setData(geojsonFiles[2]);

          function goBack() {
            map.flyTo({
              center: [81.071, 7.754],
              zoom: 7.478,
            });

            // Hide the back button
            document.getElementById("backButton").style.display = "block";

            // Hide the Distribution Line Section
            document.getElementById("distributionLineSection").style.display =
              "block";

            // Change the GeoJSON file back to dist.geojson
            map.getSource("dd").setData(geojsonFiles[1]);

            // Get the currently set GeoJSON data and log it
            var currentGeoJSON = map.getSource("dd").serialize();
            // console.log("Current GeoJSON data:", currentGeoJSON.data);

            if ((currentGeoJSON = "./JSON/dist_lines.geojson")) {
              document.getElementById("backButton").style.display = "block";

              function goBack() {
                // Reset the map view to the initial state
                map.flyTo({
                  center: [81.001, 7.904],
                  zoom: 6.81,
                });

                // Hide the back button
                document.getElementById("backButton").style.display = "none";

                // Hide the Distribution Line Section
                document.getElementById(
                  "distributionLineSection"
                ).style.display = "block";

                // Change the GeoJSON file back to dist.geojson
                map.getSource("dd").setData("./JSON/dist.geojson");
              }

              document
                .getElementById("backButton")
                .addEventListener("click", function () {
                  goBack();
                });
            }
          }

          document
            .getElementById("backButton")
            .addEventListener("click", function () {
              goBack();
            });
        }

        if (name === "C4 - Peradeniya") {
          // Set the center and zoom for Distribution Division 2
          map.flyTo({
            center: [80.7572, 7.2732],
            zoom: 9.82,
          });

          // const marker = new maplibregl.Marker()
          //   .setLngLat([80.63247164, 7.21463294])
          //   .addTo(map);

          function createTriangleMarkerElement() {
            const element = document.createElement("div");
            element.className = "triangle-marker";
            return element;
          }

          const triangleMarker1 = new maplibregl.Marker({
            element: createTriangleMarkerElement(),
          })
            .setLngLat([80.63247164, 7.21463294])
            .addTo(map);

          const triangleMarker2 = new maplibregl.Marker({
            element: createTriangleMarkerElement(),
          })
            .setLngLat([80.7572, 7.2732])
            .addTo(map);

          const triangleMarker3 = new maplibregl.Marker({
            element: createTriangleMarkerElement(),
          })
            .setLngLat([80.7786, 7.3299])
            .addTo(map);

          triangleMarker1.getElement().addEventListener("click", function () {
            window.location.href = "http://localhost:3000/Regions2"; // Replace with the URL of the page you want to navigate to
          });

          triangleMarker2.getElement().addEventListener("click", function () {
            window.location.href = "http://localhost:3000/Regions2"; // Replace with the URL of the page you want to navigate to
          });

          triangleMarker3.getElement().addEventListener("click", function () {
            window.location.href = "http://localhost:3000/Regions2"; // Replace with the URL of the page you want to navigate to
          });

          // Show the back button
          document.getElementById("backButton").style.display = "block";

          // Change the GeoJSON file to dist_lines.geojson
          map.getSource("dd").setData(geojsonFiles[3]);
          
          map.on("mousemove", "polygons", function (e) {
            map.getCanvas().style.cursor = "pointer";
          
            var coordinates = e.lngLat;
            var properties = e.features[0].properties;
          
            popup
              .setLngLat(coordinates)
              .setHTML(
                "<h3>" +
                  properties.name +
                  "</h3>" 
              )
              .addTo(map);
          });
          
          map.on("mouseleave", "polygons", function () {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });
          
          function goBack() {
            if (triangleMarker1) {
              triangleMarker1.remove();
            }
            if (triangleMarker2) {
              triangleMarker2.remove();
            }
            if (triangleMarker3) {
              triangleMarker3.remove();
            }
            // Reset the map view to the initial state
            map.flyTo({
              center: [80.9071, 7.5243],
              zoom: 8.82,
            });

            // Hide the back button
            document.getElementById("backButton").style.display = "block";

            // Hide the Distribution Line Section
            document.getElementById("distributionLineSection").style.display =
              "block";

            // Change the GeoJSON file back to dist.geojson
            map.getSource("dd").setData(geojsonFiles[2]);

            // Get the currently set GeoJSON data and log it
            var currentGeoJSON = map.getSource("dd").serialize();
            console.log("Current GeoJSON data:", currentGeoJSON.data);

            if ((currentGeoJSON = geojsonFiles[2])) {
              document.getElementById("backButton").style.display = "block";

              function goBack() {
                // Reset the map view to the initial state
                map.flyTo({
                  center: [81.071, 7.754],
                  zoom: 7.478,
                });

                // Hide the back button
                document.getElementById("backButton").style.display = "block";

                // Hide the Distribution Line Section
                document.getElementById(
                  "distributionLineSection"
                ).style.display = "block";

                // Change the GeoJSON file back to dist.geojson
                map.getSource("dd").setData(geojsonFiles[1]);

                var currentGeoJSON = map.getSource("dd").serialize();
                console.log("Current GeoJSON data:", currentGeoJSON.data);

                if ((currentGeoJSON = geojsonFiles[1])) {
                  document.getElementById("backButton").style.display = "block";

                  function goBack() {
                    // Reset the map view to the initial state
                    map.flyTo({
                      center: [81.001, 7.904],
                      zoom: 6.81,
                    });

                    // Change the GeoJSON file back to dist.geojson
                    map.getSource("dd").setData("./JSON/dist.geojson");

                    // Hide the back button
                    document.getElementById("backButton").style.display =
                      "none";

                    // Hide the Distribution Line Section
                    document.getElementById(
                      "distributionLineSection"
                    ).style.display = "block";
                  }

                  document
                    .getElementById("backButton")
                    .addEventListener("click", function () {
                      goBack();
                    });
                }
              }

              document
                .getElementById("backButton")
                .addEventListener("click", function () {
                  goBack();
                });
            }
          }

          document
            .getElementById("backButton")
            .addEventListener("click", function () {
              goBack();
            });
        }

        document
          .getElementById("polygonsButton")
          .addEventListener("click", function () {
            selectLayer("polygons");
            document.getElementById("distributionLineSection").style.display =
              "block";
          });
      });
    }
  }

  if (selectedLayer !== "none") {
    map.removeLayer(selectedLayer);
    map.removeSource(selectedLayer);
  }

  selectedLayer = layer;
}

document
  .getElementById("polygonsButton")
  .addEventListener("click", function () {
    selectLayer("polygons");
    document.getElementById("distributionLineSection").style.display = "block";
  });

  document.getElementById('homeButton').addEventListener('click', function () {
    const confirmed = window.confirm('Are you sure you want to navigate to the SCADA home page?');
    
    if (confirmed) {
      window.location.href = 'http://localhost:3000/';
    }
  });
  