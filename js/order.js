window.addEventListener("DOMContentLoaded", function () {
    // Payment section
    class Payment {
        constructor(n, e, a, pm, cn, gc) {
            this.fullName = n;
            this.email = e;
            this.address = a;
            this.payMethod = pm;
            this.cardNum = cn;
            this.giftCard = gc;
        }
        
        showList() {
            if (this.fullName === "" || this.address === "" || this.email === "" || this.payMethod === "") {
                alert("Name, email, address, and payment method cannot be empty");
                return;
            }
        
            // Validate full name
            let regexName = /^[A-Za-z.]{3,20}\s[A-Za-z.]{3,20}$/;
            if (!regexName.test(this.fullName)) {
                alert("Please check the name entered. Enter only first and last name");
                return;
            }
        
            // Validate email
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(this.email)) {
                alert("Please enter a valid email address");
                return;
            }
        
            // Validate address
            let regexAddress = /^[A-Za-z0-9.\s,'-]+(?:\s+[A-Za-z\s]+)?$/;
            if (!regexAddress.test(this.address)) {
                alert("Please enter a valid address - street and city");
                return;
            }
        
            // Validate payment method and card number
            let cardNumRowContent = "";
            if (this.payMethod === "Credit Card" || this.payMethod === "Debit Card" || this.payMethod === "Other Card") {
                if (this.cardNum === "") {
                    alert("Card number must be entered!");
                    return;
                }
                // Validate card number
                let regexCardNum = /^[0-9]{16}$/;
                if (!regexCardNum.test(this.cardNum)) {
                    alert("Please enter a valid 16-digit card number");
                    return;
                }
                cardNumRowContent = `<p><span class="bold">Card Number:</span> &nbsp;<span class="textSize">${this.cardNum}</span></p>`;
            } else {
                cardNumRowContent = `<p><span class="bold">Card Number:</span> &nbsp;<span class="textSize">Not applicable</span></p>`;
            }
        
            // div that will be added to a html code
            let validatedContent = `
                <div>
                    <p><span class="bold">Name:</span> &nbsp;<span class="textSize">${this.fullName}</span></p>
                    <p><span class="bold">Email:</span> &nbsp;<span class="textSize">${this.email}</span></p>
                    <p><span class="bold">Address:</span> &nbsp;<span class="textSize">${this.address}</span></p>
                    <p><span class="bold">Payment Method:</span> &nbsp;<span class="textSize">${this.payMethod}</span></p>
                    ${cardNumRowContent}
                    <p><span class="bold">Gift Card:</span> &nbsp;<span class="textSize">${this.giftCard !== "" ? this.giftCard : 'Not applicable'}</span></p>
                </div>
            `;
            document.querySelector("#infoCheck").innerHTML = validatedContent;
        }  
        
        clearData() {
            document.querySelector("#infoCheck").remove();
        }
    }

    class MenuData {
        constructor(r, items = []) {
            this.request = r;
            this.items = items;
        }
        menuFood() {
            var selectedItemsList = document.getElementById("menuList");
            selectedItemsList.innerHTML = ""; // Clear existing list

            // Loop through each food item and add to the table if count > 0
            this.items.forEach(function(item) {
                var itemName = item.querySelector("h2").textContent;
                var price = item.querySelector("p").textContent;
                var count = parseInt(item.querySelector(".counter p").textContent);

                if (count > 0) {
                    var row = document.createElement('tr');
                    row.innerHTML = `<td>${itemName}</td><td>${price}</td><td>${count}</td>`;
                    selectedItemsList.appendChild(row);
                }
            });
        }
        menuRequestRead() {
            let requestData = `
            <div>
                <p><span class="bold">Any requests or allergies:</span> <span class="textSize">${this.request}</span></p>
            </div>`;
            document.querySelector("#menuCheck").innerHTML = requestData;
        }

        clearData() {
            document.querySelector("#menuList").parentElement.remove();
            document.querySelector("#menuCheck").remove();
        }
    }


    let menuRequest = this.document.querySelector("#menuForm");
    let form = this.document.querySelector("#infoForm");
    let submitAppBtn = this.document.querySelector(".applyAppBtn");
    let submitMainsBtn = this.document.querySelector(".applyMainsBtn");
    let submitSidBtn = this.document.querySelector(".applySidBtn");
    let submitDDBtn = this.document.querySelector(".applyDDBtn");
    let menuRemove = this.document.querySelector("#clearMenuData");
    let payRemove = this.document.querySelector("#clearPayData");
    let payApply = this.document.querySelector("#applyPayData");


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let fullName = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let address = document.querySelector("#address").value;
        let payMethod = document.querySelector("#payMethod").value;
        let cardNum = document.querySelector("#cardNum").value;
        let giftCard = document.querySelector("#giftCard").value;


        let pay = new Payment(fullName, email, address, payMethod, cardNum, giftCard);
        pay.showList();
    });
    submitAppBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var menuToOrder = document.querySelectorAll(".foodBox");
        var foodItems = Array.from(menuToOrder); // Convert NodeList to Array for MenuData constructor
        let foodList = new MenuData(null, foodItems);
        foodList.menuFood();
    });
    submitMainsBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var menuToOrder = document.querySelectorAll(".foodBox");
        var foodItems = Array.from(menuToOrder); // Convert NodeList to Array for MenuData constructor
        let foodList = new MenuData(null, foodItems);
        foodList.menuFood();
    });
    submitSidBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var menuToOrder = document.querySelectorAll(".foodBox");
        var foodItems = Array.from(menuToOrder); // Convert NodeList to Array for MenuData constructor
        let foodList = new MenuData(null, foodItems);
        foodList.menuFood();
    });
    submitDDBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var menuToOrder = document.querySelectorAll(".foodBox");
        var foodItems = Array.from(menuToOrder); // Convert NodeList to Array for MenuData constructor
        let foodList = new MenuData(null, foodItems);
        foodList.menuFood();
    });

    menuRequest.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let request = document.querySelector("#restrictionFood").value;

        let menu = new MenuData(request);
        menu.menuRequestRead();
    });

    menuRemove.addEventListener("click", function(e) {
        let removeBtn = new MenuData();
        removeBtn.clearData();
    });
    payRemove.addEventListener("click", function(e) {
        let removeBtn = new Payment();
        removeBtn.clearData();
    });
    payApply.addEventListener("click", function(e) {
        let applyPayBtn = new Payment();
        let applyMenuBtn = new MenuData();
        applyMenuBtn.clearData();
        applyPayBtn.clearData();
    });
});

