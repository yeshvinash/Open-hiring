let customTagInputParent, tagInputValue, customTagInputs;
      customTagInputParent = document.querySelectorAll(".custom-tag-select-wrap");
      customTagInputs = document.querySelectorAll(".custom-tag-select-wrap input");

      function clearInput(e) {
        let currentInput = e.target.closest(".custom-input-wrap").querySelector("input");
        currentInput.value = "";
      }

      function handleTagInputTyping(e) {
        tagInputValue = e.target.value;

        if (tagInputValue !== "" && tagInputValue.replace(/\s/g, "").length) {
          if (e.key === "Enter") {
            addTagToList(e, tagInputValue);
            clearInput(e);
          }
        }
      }

      function removeTagFromList(e) {
        e.target.closest(".custom-tag").remove();
      }

      function addTagToList(event, value) {
        let eventParent;

        let tag, removeBtn, removeBtnImage;
        tag = document.createElement("li");
        tag.classList.add("custom-tag");

        removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-tag-btn");

        removeBtnImage = document.createElement("img");
        removeBtnImage.src = "assets/images/logo/icon-close.svg";
        removeBtnImage.alt = "remove tag";
        removeBtn.addEventListener("click", removeTagFromList);
        removeBtn.appendChild(removeBtnImage);

        tag.innerText = value;
        tag.appendChild(removeBtn);

        eventParent = event.target.closest(".custom-tag-select-wrap");
        eventParent.querySelector(".custom-tag-list").appendChild(tag);
      }

      customTagInputs.forEach(function (input) {
        input.addEventListener("keyup", handleTagInputTyping);
      });

      customTagInputParent.forEach(function (parent) {
        parent.querySelector(".add-tag-btn").addEventListener("click", function (e) {
          let currentParentInput = e.target.closest(".custom-tag-select-wrap").querySelector("input");

          if (currentParentInput.value !== "" && currentParentInput.value.replace(/\s/g, "").length) {
            addTagToList(e, currentParentInput.value);
            clearInput(e);
          }
        });
      });