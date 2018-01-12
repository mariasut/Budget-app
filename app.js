
//BUDGET CONTROLLER

let budgetController = (function() {

  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      let newItem;

      // Create new ID

      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if(type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();


// UI CONTROLLER

let UIController = (function() {

  var DOMstrings = {
    inputType: '.add-type',
    inputDescription: '.add-description',
    inputValue: '.add-value',
    inputBtn: '.add-btn',
    incomeContainer: '.income-list',
    expensesContainer: '.expenses-list'
  }

  return {

    getInput: function() {

        return {
          type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
        };
       },

       addListItem: function(obj, type) {


        // Create HTML string with placeholder text
          let html, newHtml, element;

        if(type === 'inc') {
          element = DOMstrings.incomeContainer;

          html = '<div class="item clearfix" id="income-%id%"> <div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        } else if(type === 'exp') {
          element = DOMstrings.expensesContainer;

          html = '<div class="item clearfix" id="expense-%id%"> <div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-percentage">21%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }


        // Replace the placeholder text with actual data

          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);

        // Insert HTML into the DOM

          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

       },

        // clear fields

        clearFields: function() {
          let fields, fieldsArr;

          fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
          fieldsArr = Array.prototype.slice.call(fields);
          fieldsArr.forEach(function(current, index, array) {
            current.value = "";
          });

          fieldsArr[0].focus();
        },


       getDOMstrings: function() {
        return DOMstrings;
       }
  };

})();

// GLOBAL APP CONTROLLER

let controller = (function(budgetCtrl, UICtrl) {


  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  let updateBudget = function() {


    // 1. calculate the budget

    // 2. return the budget

    // 3.display the budget on the UI

  };

  let ctrlAddItem = function() {

    let input, newItem;
     // 1. get the field input data
    input = UICtrl.getInput();

    if (input.description !== ""  && !isNaN(input.value) && input.value > 0) {

        // 2.add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
      }

  };

  return {
    init: function() {
      console.log('application has started.');
      setupEventListeners();
    }
  };

})(budgetController, UIController);


controller.init();




















