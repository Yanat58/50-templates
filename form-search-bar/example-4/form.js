(function () {
  // get all data in form and return object
  function getFormData(form) {
    const elements = form.elements;
    let honeypot;

    const fields = Object.keys(elements)
      .filter(function (k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    const formData = {};
    fields.forEach(function (name) {
      const element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        const data = [];
        for (let i = 0; i < element.length; i+=1) {
          let item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSend = form.dataset.email || ""; // no email by default

    return { data: formData, honeypot: honeypot };
  }

  function handleFormSubmit(event) {
    // handles form submit without any jquery
    event.preventDefault(); // we are submitting via xhr below
    const form = event.target;
    const formData = getFormData(form);
    const data = formData.data;
    console.log(form.data);
    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }
    disableAllButtons(form);
    const url = form.action;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        const formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        const thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      }
    };
    // url encode form data for sending as post data
    const encoded = Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    const forms = document.querySelectorAll("form.gform");
    for (let i = 0; i < forms.length; i+=1) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    const buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i+=1) {
      buttons[i].disabled = true;
    }
  }
})();
