$(document).ready(function () {
  //Buttons used to swap between slider modes and pricing
  const monthlyButton = document.querySelector(".monthly-button");
  const yearlyButton = document.querySelector(".yearly-button");
  const packageSelector = document.querySelector(".package-selector");
  const buyButton = document.querySelector("#buy-button");
  const lightCheckBtnText = $("#lightCheckBtn");

  //Extra components for the card details
  const cardPricePerCheck = $(".price-tag-bold");
  const platformFee = $(".platform-fee");
  const totalPerCheck = $(".total-per-check");
  const totalAmountOfChecks = $(".amount-of-checks");
  const scaleValue = $("#scale-value");
  const totalPrice = $(".total-price");
  const checkPrice = $(".check-price");
  const checksPerSaving = $(".amount-of-checks-saving");
  const amountSaved = $(".amount-saved");
  const percentageSaved = $(".percentage-saved");

  // totalPerCheck.text(
  //   "$ " +
  //     (parseFloat(cardPricePerCheck.text().slice(1)) +
  //       parseFloat(platformFee.text().slice(1))).toFixed(2)
  // );
  let mode = "light";
  let monthly = true;

  if (getQueryStringValue(window.location.href) == "standard") {
    mode = "standard";
    lightCheckBtnText.text("Standard Check");
    $(".cost-per-check").text("$16.80");
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
  const savingsLightMonthly = [4.0, 17.99, 34.98, 79.96, 171.91, 275.86];
  const savingsLightYearly = [56.73, 234.95, 445.55, 999.05, 2127.63, 3385.75];
  const savingsStandardMonthly = [4.0, 35.99, 69.98, 159.96, 343.91, 551.86];
  const savingsStandardYearly = [
    71.02, 472.19, 894.95, 2005.85, 4270.83, 6794.95,
  ];

  //Array of platform fees per check
  const platformFeesMonthlyLight = [7.29, 5.29, 4.29, 3.29, 2.69, 2.09];
  const platformFeesMonthlyStandard = [19.19, 11.19, 9.19, 7.19, 5.99, 4.79];
  const platformFeesYearlyLight = [6.56, 4.76, 3.86, 2.96, 2.42, 1.89];
  const platformFeesYearlyStandard = [17.27, 10.07, 8.27, 6.47, 5.39, 4.32];

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

  let isStandardHidden = true;
  let isLightHidden = false;
  let currentIndex = 0;

  if (mode == "standard") {
    lightCheckList.hide();
    isStandardHidden = false;
    isLightHidden = true;
    checkPrice.text("$39.99");
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
      $(".cost-per-check").text("$8.70");
      lightCheckBtnText.text("Light Check");

      if (monthly) {
        setRangeValues(
          valuesMonthly,
          costsMonthlyLight,
          platformFeesMonthlyLight,
          savingsLightMonthly,
          percentageLightMonthly
        );
      } else {
        setRangeValues(
          valuesYearly,
          costsYearlyLight,
          platformFeesYearlyLight,
          savingsLightYearly,
          percentageLightYearly
        );
      }
    } else {
      closeBottomSheet();
    }
    checkPrice.text("$19.99");
    mode = "light";
  });

  standardCheck.click(() => {
    if (isStandardHidden) {
      isStandardHidden = false;
      isLightHidden = true;
      standardCheckList.slideDown(500);
      lightCheckList.slideUp(500);
      lightCheckBtnText.text("Standard Check");
      $(".cost-per-check").text("$16.80");
      if (monthly) {
        setRangeValues(
          valuesMonthly,
          costsMonthlyStandard,
          platformFeesMonthlyStandard,
          savingsStandardMonthly,
          percentageStandardMonthly
        );
      } else {
        setRangeValues(
          valuesYearly,
          costsYearlyStandard,
          platformFeesYearlyStandard,
          savingsStandardYearly,
          percentageStandardYearly
        );
      }
    } else {
      closeBottomSheet();
    }
    checkPrice.text("$39.99");
    mode = "standard";
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
    monthly = false;
    title.html("How many checks will you run yearly?");
    if (mode === "standard") {
      setRangeValues(
        valuesYearly,
        costsYearlyStandard,
        platformFeesYearlyStandard,
        savingsStandardYearly,
        percentageStandardYearly
      );
    } else {
      setRangeValues(
        valuesYearly,
        costsYearlyLight,
        platformFeesYearlyLight,
        savingsLightYearly,
        percentageLightYearly
      );
    }
    yearlyButton.classList.add("active");
    monthlyButton.classList.remove("active");
  });

  monthlyButton.addEventListener("click", () => {
    monthly = true;
    if (mode === "standard") {
      setRangeValues(
        valuesMonthly,
        costsMonthlyStandard,
        platformFeesMonthlyStandard,
        savingsStandardMonthly,
        percentageStandardMonthly
      );
    } else {
      setRangeValues(
        valuesMonthly,
        costsMonthlyLight,
        platformFeesMonthlyLight,
        savingsLightMonthly,
        percentageLightMonthly
      );
    }
    title.html("How many checks will you run monthly?");
    monthlyButton.classList.add("active");
    yearlyButton.classList.remove("active");
  });

  function setRangeValues(
    valueSelected = valuesMonthly,
    cost = mode == "standard" ? costsMonthlyStandard : costsMonthlyLight,
    platformFees = mode == "standard"
      ? platformFeesMonthlyStandard
      : platformFeesMonthlyLight,
    savings = mode == "standard" ? savingsStandardMonthly : savingsLightMonthly,
    percentage = mode == "standard"
      ? percentageStandardMonthly
      : percentageLightMonthly
  ) {
    const values = valueSelected;

    platformFee.text("$" + platformFees[currentIndex]);
    cardPricePerCheck.text("$" + cost[currentIndex]);
    scaleValue.html(
      valueSelected[currentIndex] +
        `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
    );
    totalPerCheck.text("$ " + cost[currentIndex]);
    totalAmountOfChecks.text("x " + valueSelected[currentIndex]);
    totalPrice.text(
      "$" +
        (cost[currentIndex] * valueSelected[currentIndex]).toFixed(2) +
        "/Year"
    );
    amountSaved.text("$" + savings[currentIndex].toFixed(2));
    percentageSaved.text(percentage[currentIndex] + "%");

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

        scaleValue.html(
          valueSelected[currentIndex] +
            `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
        );
        totalPerCheck.text("$ " + cost[currentIndex]);
        cardPricePerCheck.text("$" + cost[currentIndex]);
        platformFee.text("$" + platformFees[currentIndex]);
        totalAmountOfChecks.text("x " + valueSelected[currentIndex]);
        checksPerSaving.text(valueSelected[currentIndex]);
        totalPrice.text(
          "$" +
            (cost[currentIndex] * valueSelected[currentIndex]).toFixed(2) +
            "/Year"
        );
        amountSaved.text("$" + savings[currentIndex].toFixed(2));
        percentageSaved.text(percentage[currentIndex] + "%");
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
      return nearest;
    }
  }
  setRangeValues();
  $(".ui-slider-handle").append(`
  <svg class="left icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 7l-5 5 5 5V7z"></path>
            </svg>
            <svg class="right icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 17l5-5-5-5v10z"></path>
            </svg>`);
});

// function changePackageType(valueSelected, cost) {
//   const values = valueSelected;
//   $("#scale-value").html(
//     valueSelected[currentIndex] +
//       `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
//   );
//   cardPricePerCheck.text("$" + cost[currentIndex]);
//   let slider = $("#scale-slider").slider({
//     min: valueSelected[0],
//     max: valueSelected[valueSelected.length - 1],
//     value: valueSelected[currentIndex],
//     slide: function (event, ui) {
//       let includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
//       let includeRight = event.keyCode != $.ui.keyCode.LEFT;
//       slider.slider(
//         "option",
//         "value",
//         findNearest(includeLeft, includeRight, ui.value)
//       );
//       currentIndex = valueSelected.findIndex(
//         (x) => x == findNearest(includeLeft, includeRight, ui.value)
//       );
//       $("#scale-value").html(
//         valueSelected[currentIndex] +
//           `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
//       );
//       platformFee.text("$" + platformFeesMonthlyLight[currentIndex]);
//       return false;
//     },
//   });
//   function findNearest(includeLeft, includeRight, value) {
//     let nearest = null;
//     let diff = null;
//     for (let i = 0; i < values.length; i++) {
//       if (
//         (includeLeft && values[i] <= value) ||
//         (includeRight && values[i] >= value)
//       ) {
//         let newDiff = Math.abs(value - values[i]);
//         if (diff == null || newDiff < diff) {
//           nearest = values[i];
//           diff = newDiff;
//         }
//       }
//     }

//     $("#scale-value").html(
//       nearest +
//         `<span class="price-scale">($${cost[currentIndex]}/check)</span>`
//     );
//     cardPricePerCheck.text("$" + cost[currentIndex]);
//     return nearest;
//   }
// }

// $(function () {
//   const values = valuesMonthly;
//   let slider = $("#scale-slider").slider({
//     min: 1,
//     max: 30,
//     slide: function (event, ui) {
//       let includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
//       let includeRight = event.keyCode != $.ui.keyCode.LEFT;
//       slider.slider(
//         "option",
//         "value",
//         findNearest(includeLeft, includeRight, ui.value)
//       );
//       currentIndex = valuesMonthly.findIndex(
//         (x) => x == findNearest(includeLeft, includeRight, ui.value)
//       );
//       return false;
//     },
//   });

//   function findNearest(includeLeft, includeRight, value) {
//     let nearest = null;
//     let diff = null;
//     for (let i = 0; i < values.length; i++) {
//       if (
//         (includeLeft && values[i] <= value) ||
//         (includeRight && values[i] >= value)
//       ) {
//         let newDiff = Math.abs(value - values[i]);
//         if (diff == null || newDiff < diff) {
//           nearest = values[i];
//           diff = newDiff;
//         }
//       }
//     }
//     $("#scale-value").html(
//       nearest +
//         `<span class="price-scale">($${
//           costsMonthlyLight[valuesMonthly.findIndex((x) => x == nearest)]
//         }/check)</span>`
//     );
//     cardPricePerCheck.text(
//       "$" + costsMonthlyLight[valuesMonthly.findIndex((x) => x == nearest)]
//     );
//     platformFee.text("$" + platformFeesMonthlyLight[currentIndex]);
//     return nearest;
//   }
//   $(".ui-slider-handle").append(`
// <svg class="left icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
//               <path d="M14 7l-5 5 5 5V7z"></path>
//           </svg>
//           <svg class="right icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
//               <path d="M10 17l5-5-5-5v10z"></path>
//           </svg>`);
// });
