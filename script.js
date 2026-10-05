const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ======================================================
// MOBILE NAVIGATION
// ======================================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function() {

    navMenu.classList.toggle("active");

});


// Close menu after clicking a link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("active");

    });

});


// ======================================================
// INQUIRY FORM
// ======================================================

const inquiryForm = document.getElementById("inquiryForm");

const submitBtn = document.getElementById("submitBtn");

const formMessage = document.getElementById("formMessage");


inquiryForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Get form values

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const area =
        document.getElementById("area").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const milkQuantity =
        document.getElementById("milk_quantity").value;

    const inquiryType =
        document.getElementById("inquiry_type").value;

    const message =
        document.getElementById("message").value.trim();


    // Basic validation

    if (!name || !phone || !area || !address) {

        formMessage.textContent =
            "Please fill all required fields.";

        formMessage.style.color = "red";

        return;

    }


    // Phone validation

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {

        formMessage.textContent =
            "Please enter a valid 10-digit Indian phone number.";

        formMessage.style.color = "red";

        return;

    }


    // Disable button

    submitBtn.disabled = true;

    submitBtn.textContent = "Sending Inquiry...";


    try {

        // Send data to Supabase

        const { data, error } = await supabaseClient

            .from("milk_inquiries")

        .insert([

            {
                name: name,
                phone: phone,
                area: area,
                pincode: pincode,
                address: address,
                milk_quantity: milkQuantity,
                inquiry_type: inquiryType,
                message: message
            }

        ]);


        if (error) {

            console.error(error);

            throw error;

        }


        // Success

        formMessage.textContent =
            "Thank you! Your inquiry has been received. We will contact you shortly.";

        formMessage.style.color = "green";


        // Reset form

        inquiryForm.reset();


    } catch (error) {

        console.error("Supabase Error:", error);

        formMessage.textContent =
            "Something went wrong. Please call us on 8208030296.";

        formMessage.style.color = "red";

    }


    // Enable button again

    submitBtn.disabled = false;

    submitBtn.textContent = "Send Inquiry";

});