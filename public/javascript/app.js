$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8081/session",
        type: "GET",
        dataType: "json",
        success: function(data) {
            //  console.log(request.getAllResponseHeaders());
            console.log("jgh", data.session);
            console.log(data);
            if (data.session == true) {
                loginSuccessPage();
            }
        }
    });
    /**/
    // function validateForm() {
    //     var firstName = $('#exampleInputFirstNamelog').val();
    //     var lastName = $('#exampleInputLastName').val();
    //     var emailAddress = $('#exampleInputEnterEmail').val();
    //     var creatPassword = $('#exampleInputCreatePassword').val();
    //     var confromPassword = $('#exampleInputConfirmPassword').val();
    //     var mobileNumber = $('#exampleInputMobileNo').val();
    //     var newmobileno = parseInt(mobileNumber);
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
    var Userlogin = function(email, password) {
        this.email = email;
        this.password = password;
    };
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
    function indexPage() {
        $.ajax({
            url: "index.html",
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
        var credentialsFlag = false;
        var userloginobj = new Userlogin(eAddress, password);
        console.log("userobj is........", userloginobj);
        $.ajax({
            url: "http://localhost:8081/login",
            type: "POST",
            dataType: "JSON",
            data: JSON.stringify(userloginobj),
            contentType: 'application/json',
            success: function(data) {
                console.log("login response is........", data);
                for (var i = 0; i < data.length; i++) {
                    var status1 = data[i].status;
                    if (!data[i].session && !status1 || data[i].param == "email" || data[i].param == "createPass" || data[i].param == "confirmPass" || data[i].param == "mob") {
                        $('span').remove();
                        $('#loginresult').after('<span class="error" id="sp">' + data[i].msg + '</span><br>');
                    } else {
                        loginSuccessPage();
                    }
                }
            }
        });
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
        $(':input', '#signup-form').not(':submit').val('');
        $.ajax({
            url: "http://localhost:8081/signup",
            type: "POST",
            dataType: "JSON",
            data: JSON.stringify(userobj),
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var status1 = data[i].status;
                    if (status1 || data[i].param == "email" || data[i].param == "createPass" || data[i].param == "confirmPass" || data[i].param == "mob") {
                        $('span').remove();
                        $('#result').after('<span class="error">' + data[i].msg + '</span><br>');
                    } else {
                        $('span').remove();
                        $('#result').after('<span class="error">' + data[i].msg + '</span>');
                    }
                }
            }
        });
        event.preventDefault();
    }));
    /*
    it is calling by logout button fromlogin success page
    */
    $(document).on("click", "#logout-button", (function() {
        $.ajax({
            url: "http://localhost:8081/logout",
            type: "GET",
            success: function(data) {
                console.log("jgh", data.session);
                if (data.session == false) {
                    indexPage();
                }
            }

        });
    }));
    if (typeof window.location.origin === "undefined") {
        window.location.origin = window.location.protocol + "//" + window.location.host;
    }
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
            this.bindEvents();
            $(window).trigger("hashchange");
        },
        bindEvents: function() {
            $(window).on("hashchange", this.render.bind(this));
        },
        render: function() {
            var keyName = window.location.hash.split("/")[0];
            var url = window.location.hash;
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
            utils.renderPageTemplate("#login-page-template");
        },
        "#signup": function(url) {
            utils.renderPageTemplate("#signup-page-template");
        },
    };
    var spaRouter = $.extend({}, router, {
        routes: spaRoutes
    });
    spaRouter.init();
});
