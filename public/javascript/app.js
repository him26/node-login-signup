$(document).ready(function() {
    // if (sessionStorage.getItem("email") !== null) {
    //     console.log(sessionStorage.getItem('email'));
    //     loginSuccessPage();
    // }
        /*
        constructor for create signup object
        */
    var User = function(fname, lname, email, createPass, confirmPass, mob) {
            this.fname = fname;
            this.lname = lname;
            this.email = email;
            this.createPass = createPass;
            this.confirmPass = confirmPass;
            this.mob = mob;
        };
        /*
        function for set singnup data into cookies
        */
    function setCookie(cname, cvalue, exdays) {
        var cookiesflag = false;
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        if (document.cookie) {
            cookiesflag = true;
            console.log("hi.........");
        }
        return cookiesflag;
    }
      /*
      function for get signup data from cookies
      */
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.log("cookies is ", ca);
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
      /*
      function for validate form value
      */
    // function validateForm() {
    //     var firstName = $('#exampleInputFirstNamelog').val();
    //     var lastName = $('#exampleInputLastName').val();
    //     var emailAddress = $('#exampleInputEnterEmail').val();
    //     var creatPassword = $('#exampleInputCreatePassword').val();
    //     var confromPassword = $('#exampleInputConfirmPassword').val();
    //     var mobileNumber = $('#exampleInputMobileNo').val();
    //     var newmobileno = parseInt(mobileNumber);
    //     // console.log(typeof("hiiiiiiiiiiiiiii", mobileNumber));
    //     var nameval = /^[A-Za-z]+$/;
    //     var passval = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/;
    //     var emailval = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //     var mobileval = /^([7-9]{1}[0-9]{9})$/;
    //     var inputVal = new Array(firstName, lastName, emailAddress, creatPassword, confromPassword, newmobileno);
    //     var flag = true;
    //     $('.error').hide();
    //     if (inputVal[0] === "") {
    //         $('#exampleInputFirstNamelog').after('<span class="error"> Please enter your Name</span>');
    //         flag = false;
    //     } else if (!nameval.test(firstName)) {
    //         $('#exampleInputFirstNamelog').after('<span class="error"> Letters only</span>');
    //         flag = false;
    //     }
    //     if (inputVal[1] === "") {
    //         $('#exampleInputLastName').after('<span class="error"> Please enter your lastname</span>');
    //         flag = false;
    //     } else if (!nameval.test(lastName)) {
    //         $('#exampleInputLastName').after('<span class="error"> Letters only</span>');
    //         flag = false;
    //     }
    //     if (inputVal[2] === "") {
    //         $('#exampleInputEnterEmail').after('<span class="error"> Please enter your email address </span>');
    //         flag = false;
    //     } else if (!emailval.test(emailAddress)) {
    //         $('#exampleInputEnterEmail').after('<span class="error"> Please enter a valid email address</span>');
    //         flag = false;
    //     }
    //     if (inputVal[3] === "") {
    //         $('#exampleInputCreatePassword').after('<span class="error"> Please enter your  password</span>');
    //         flag = false;
    //     } else if (!passval.test(creatPassword)) {
    //         $('#exampleInputCreatePassword').after('<span class="error">atleast one alphabet,specialsymbol,numeric,uppercase Letters</span>');
    //         flag = false;
    //     }
    //     if (inputVal[4] !== inputVal[3] || inputVal[4] === "") {
    //         $('#exampleInputConfirmPassword').after('<span class="error">please enter your password </span>');
    //         flag = false;
    //     }
    //     if (!mobileval.test(newmobileno)) {
    //         $('#exampleInputMobileNo').after('<span class="error">please enter correct mobile no </span>');
    //         flag = false;
    //     }
    //     return flag;
    // }
    //   /*function for calling login success page by ajax*/
    function loginSuccessPage() {
        $.ajax({
            url: "loginValid.html",
            type: "GET",
            dataType: "text",
            success: function(response) {
                $("#body").html(response);
            }
        });
    }
      /*it is calling by login form submit button*/
    $(document).on("submit", "#login", (function(event) {
        var eAddress = $('#exampleInputEmaillog').val();
        var password = $('#exampleInputPasswordpas').val();
        var user = JSON.parse(getCookie("detail"));
        var credentialsFlag = false;
        console.log(user);
        for (var i = 0; i < user.length; i++) {
            var em = user[i].email;
            var pass = user[i].p1;
            if (eAddress == em && password == pass) {
                credentialsFlag = true;
            }
        }
        if (credentialsFlag) {
            sessionStorage.setItem("email", eAddress);
            loginSuccessPage();
        } else {
            alert("your email credentials are not valid");
        }
        event.preventDefault();
    }));
      /*
      it is calling by signup-form  submit button
      */
    $(document).on("submit", "#signup-form", (function(event) {


            var firstName = $('#exampleInputFirstNamelog').val();
            var lastName = $('#exampleInputLastName').val();
            var emailAddress = $('#exampleInputEnterEmail').val();
            var creatPassword = $('#exampleInputCreatePassword').val();
            var confirmPassword = $('#exampleInputConfirmPassword').val();
            var mobileNumber = $('#exampleInputMobileNo').val();
            var newMobNo = parseInt(mobileNumber);
            var userobj = new User(firstName, lastName, emailAddress, creatPassword, confirmPassword, newMobNo);
            $.ajax({
                url: "http://127.0.0.1:8081/api/signup",
                type: "POST",
                dataType: "JSON",
                data: JSON.stringify(userobj),
                contentType: 'application/json',
                success: function(data) {
                 var data1 = JSON.parse(data);
                // var status = data.status;
                // console.log("data is ",data);
                // console.log("status is ",status);
                console.log('success');
                console.log(data1);
              }
            });
        event.preventDefault();
    }));
      /*
      it is calling by logout button fromlogin success page
      */
    $(document).on("click", "#logout-button", (function() {
        sessionStorage.removeItem("email");
        window.location.hash = "";
        location.reload();
        return;
    }));
    // if (typeof window.location.origin === "undefined") {
    //     window.location.origin = window.location.protocol + "//" + window.location.host;
    // }
    var utils = {
        renderPageTemplate: function(templateId, data) {
            console.log("templateId....", templateId);
            console.log("data......", data);
            var _data = data || {};
            var templateScript = $(templateId).html();
            var template = Handlebars.compile(templateScript);
            $("#page-container").empty();
            $("#page-container").append(template(_data));
        },
        pageNotFoundError: function() {
            var data = {
                errorMessage: "404 - Page Not Found"
            };
            this.renderPageTemplate("#error-page-template", data);
        },
    };
    var router = {
        routes: {},
        init: function() {
            console.log('router was created...');
            this.bindEvents();
            $(window).trigger("hashchange");
        },
        bindEvents: function() {
            $(window).on("hashchange", this.render.bind(this));
        },
        render: function() {
            var keyName = window.location.hash.split("/")[0];
            // console.log("I am keyName",keyName);
            var url = window.location.hash;
            console.log("I am url",url);
            var log = $("#page-container").find(".active").hide().removeClass("active");
            if (this.routes[keyName]) {
                this.routes[keyName](url);
            } else {
                utils.pageNotFoundError();
            }
        }
    };
    var spaRoutes = {
        "#login": function(url) {
            console.log('login was called...');
            utils.renderPageTemplate("#login-page-template");
        },
        "#signup": function(url) {
            console.log('signup was called...');
            utils.renderPageTemplate("#signup-page-template");
        },
        "#signupsuccess": function(url) {
            console.log('signupsuccess was called...');
            utils.renderPageTemplate("#signupsuccess-page-template");
        }
    };
    var spaRouter = $.extend({}, router, {routes: spaRoutes});
    spaRouter.init();
});
