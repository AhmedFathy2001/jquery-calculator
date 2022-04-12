$(document).ready(function () {
  let mode = "light";
  if (getQueryStringValue(window.location.href) == "standard") {
    mode = "standard";
  } else {
    mode = "light";
  }

  //Array of all slider values
  const valuesMonthly = [1, 3, 5, 10, 20, 30];
  const valuesYearly = [12, 36, 60, 120, 240, 360];

  //Array of all monthly and yearly costs
  const costsMonthlyLight = [15.99, 13.99, 12.99, 11.99, 11.39, 10.79];
  const costsYearlyLight = [15.26, 13.46, 12.56, 11.66, 11.12, 10.59];
  const costsMonthlyStandard = [35.99, 27.99, 25.99, 23.99, 22.79, 21.59];
  const costsYearlyStandard = [34.07, 26.87, 25.07, 23.27, 22.19, 21.12];

  //Array of all percentages
  const percentageLightMonthly = [21, 30, 35, 40, 43, 46];
  const percentageStandardMonthly = [11, 30, 35, 41, 43, 46];
  const percentageLightYearly = [24, 33, 38, 42, 45, 48];
  const percentageStandardYearly = [15, 33, 38, 42, 45, 48];

  //Array of all monthly and yearly savings
  const savingsLightMonthly = [];
  const savingsLightYearly = [];
  const savingsStandardMonthly = [];
  const savingsStandardYearly = [];

  //Buttons used to swap between slider modes and pricing
  const monthlyButton = document.querySelector(".monthly-button");
  const yearlyButton = document.querySelector(".yearly-button");
  const packageSelector = document.querySelector(".package-selector");
  const buyButton = document.querySelector("#buy-button");

  //button attachment for ripple effect
  mdc.ripple.MDCRipple.attachTo(monthlyButton);
  mdc.ripple.MDCRipple.attachTo(yearlyButton);
  mdc.ripple.MDCRipple.attachTo(packageSelector);
  mdc.ripple.MDCRipple.attachTo(buyButton);

  //bottom sheet buttons and lists
  const lightCheck = $("#light-check");
  const standardCheck = $("#standard-check");
  const lightCheckList = $("#light-check-list");
  const standardCheckList = $("#standard-check-list");
  const backdrop = $(".bottom-sheet-backdrop");
  const bottomSheet = $(".bottom-sheet");
  let isStandardHidden = false;
  let isLightHidden = true;

  if (mode == "standard") {
    lightCheckList.hide();
  } else {
    standardCheckList.hide();
  }

  //bottom sheet toggle options
  function closeBottomSheet() {
    bottomSheet.slideUp(500);
    backdrop.hide();
  }
  function openBottomSheet() {
    bottomSheet.slideDown(500);
    backdrop.show();
  }

  packageSelector.addEventListener("click", openBottomSheet);

  backdrop.click(() => {
    closeBottomSheet();
  });

  //expands the elements under each category if its not
  // expanded and if its expanded it closes the bottom sheet
  lightCheck.click(() => {
    if (isLightHidden) {
      isLightHidden = false;
      isStandardHidden = true;
      lightCheckList.slideDown(500);
      standardCheckList.slideUp(500);
    } else {
      closeBottomSheet();
    }
    mode = light;
  });

  standardCheck.click(() => {
    if (isStandardHidden) {
      isStandardHidden = false;
      isLightHidden = true;
      standardCheckList.slideDown(500);
      lightCheckList.slideUp(500);
    } else {
      closeBottomSheet();
    }
  });

  const title = $("#title");

  //fetches query params and returns the value if it exists
  function getQueryStringValue(uri) {
    var regEx = new RegExp("[\\?&]" + "report_type" + "=([^&#]*)");
    var matches = uri.match(regEx);
    return matches == null ? null : matches[1];
  }

  //even listeners to swap between yearly and monthly pricing
  yearlyButton.addEventListener("click", () => {
    title.html("How many checks will you run yearly?");
    if (mode === "standard") {
      changePackageType(valuesYearly, costsYearlyStandard);
    } else {
      changePackageType(valuesYearly, costsYearlyLight);
    }
    yearlyButton.classList.add("active");
    monthlyButton.classList.remove("active");
  });
  monthlyButton.addEventListener("click", () => {
    if (mode === "standard") {
      changePackageType(valuesMonthly, costsMonthlyStandard);
    } else {
      changePackageType(valuesMonthly, costsMonthlyLight);
    }
    title.html("How many checks will you run monthly?");
    monthlyButton.classList.add("active");
    yearlyButton.classList.remove("active");
  });

  let currentIndex = 0;
  function changePackageType(valueSelected, cost) {
    const values = valueSelected;
    $("#scale-value").html(
      valueSelected[currentIndex] +
        `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
    );
    let slider = $("#scale-slider").slider({
      min: valueSelected[0],
      max: valueSelected[valueSelected.length - 1],
      value: valueSelected[currentIndex],
      slide: function (event, ui) {
        let includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
        let includeRight = event.keyCode != $.ui.keyCode.LEFT;
        slider.slider(
          "option",
          "value",
          findNearest(includeLeft, includeRight, ui.value)
        );
        currentIndex = valueSelected.findIndex(
          (x) => x == findNearest(includeLeft, includeRight, ui.value)
        );
        $("#scale-value").html(
          valueSelected[currentIndex] +
            `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
        );
        return false;
      },
    });
    function findNearest(includeLeft, includeRight, value) {
      let nearest = null;
      let diff = null;
      for (let i = 0; i < values.length; i++) {
        if (
          (includeLeft && values[i] <= value) ||
          (includeRight && values[i] >= value)
        ) {
          let newDiff = Math.abs(value - values[i]);
          if (diff == null || newDiff < diff) {
            nearest = values[i];
            diff = newDiff;
          }
        }
      }

      $("#scale-value").html(
        nearest +
          `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
      );
      return nearest;
    }
  }

  $(function () {
    const values = valuesMonthly;
    let slider = $("#scale-slider").slider({
      min: 1,
      max: 30,
      step: 0.0001,
      range: false,
      animate: "fast",
      slide: function (event, ui) {
        let includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
        let includeRight = event.keyCode != $.ui.keyCode.LEFT;
        slider.slider(
          "option",
          "value",
          findNearest(includeLeft, includeRight, ui.value)
        );
        currentIndex = valuesMonthly.findIndex(
          (x) => x == findNearest(includeLeft, includeRight, ui.value)
        );
        return false;
      },
    });

    function findNearest(includeLeft, includeRight, value) {
      let nearest = null;
      let diff = null;
      for (let i = 0; i < values.length; i++) {
        if (
          (includeLeft && values[i] <= value) ||
          (includeRight && values[i] >= value)
        ) {
          let newDiff = Math.abs(value - values[i]);
          if (diff == null || newDiff < diff) {
            nearest = values[i];
            diff = newDiff;
          }
        }
      }
      $("#scale-value").html(
        nearest +
          `<span class="price-scale">($${costsMonthlyLight[currentIndex]}/check)</span>`
      );
      return nearest;
    }
    $(".ui-slider-handle").append(`
  <svg class="left icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 7l-5 5 5 5V7z"></path>
            </svg>
            <svg class="right icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 17l5-5-5-5v10z"></path>
            </svg>`);
  });
});

/*
function setRangeValues(
    valueSelected = valuesMonthly,
    cost = costsMonthlyLight,
    initialValue = 1
  ) {
    $("#scale-value").html(initialValue);
    const values = valueSelected;
    let slider = $("#scale-slider").slider({
      min: valueSelected[0],
      max: valueSelected[valueSelected.length - 1],
      slide: function (event, ui) {
        let includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
        let includeRight = event.keyCode != $.ui.keyCode.LEFT;
        slider.slider(
          "option",
          "value",
          findNearest(includeLeft, includeRight, ui.value)
        );
        return false;
      },
    });
    function findNearest(includeLeft, includeRight, value) {
      let nearest = null;
      let diff = null;
      for (let i = 0; i < values.length; i++) {
        if (
          (includeLeft && values[i] <= value) ||
          (includeRight && values[i] >= value)
        ) {
          let newDiff = Math.abs(value - values[i]);
          if (diff == null || newDiff < diff) {
            nearest = values[i];
            diff = newDiff;
          }
        }
      }
      $("#scale-value").html(nearest);
      return nearest;
    }
  } */
