<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SeaBattle by Gleb</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background: url(img/sea-of-thieves-ship-battle-win-cannon-cannonballs-repair-sinking.jpg) no-repeat center center fixed;
                color: #cacaca;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                margin: 0;
            }

            body:after {
                content: "";
                background: #030303;
                opacity: 0.5;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                position: fixed;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                z-index: 1;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
                position: absolute;
                z-index: 1;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #bcc1c4;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            .textbox {
                width: 500px;
                height: 110px;
                position: relative;
                transform-style: preserve-3d;
                animation: turnaround 20s infinite;
            }

            .textbox-box {
                background-color: #e3f6f5;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: inset 0 0 0 3px #5c5a70;
                position: relative;
                animation: hover 2s alternate infinite;
                height: 100%;
                transform-style: preserve-3d;
                transition: all .2s ease;
            }

            .textbox-field {
                display: flex;
                flex-direction: column;
                padding: 10px 15px 15px;
                align-self: stretch;
                border-radius: 5px;
            }

            .textbox-label {
                transform: translateZ(20px);
                text-transform: uppercase;
                font-weight: bold;
                animation: hover 2s -.2s alternate infinite;
                color: #5c5a70;
                -webkit-filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
            }

            .textbox-action {
                height: 80px;
                width: 80px;
                min-width: 80px;
                margin-right: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                -border-radius: 100px;
                transform-style: preserve-3d;
                animation: hover 2s -.4s alternate infinite;
                background-color: #7c91bf;
                position: relative;
                transition: all .2s ease;
            }

            .textbox-action svg {
                fill: #5c5a70;
                width: 65%;
                height: 65%;
                animation: hover 2s -.6s alternate infinite;
                -webkit-filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
            }

            .textbox-action .textbox-face {
                background-color: #7c91bf;
                transition: all .2s ease;
            }

            .textbox-action .textbox-side {
                width: 10px;
            }

            .textbox-action .textbox-bottom,
            .textbox-action .textbox-top {
                height: 10px;
            }

            .textbox-action:hover {
                cursor: pointer;
                background-color: #3d4964;
            }

            .textbox-action:hover .textbox-face {
                background-color: #3d4964;
            }

            .textbox-action:hover svg {
                fill: #7c91bf;
            }

            .textbox-text {
                width: 100%;
                height: 100%;
                border: none;
                background-color: transparent;
                font: 2.5rem sans-serif;
                animation: hover 2s -.4s alternate infinite;
                display: block;
                color: #5c5a70;
                -webkit-filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
            }

            .textbox-text::placeholder {
                color: #5c5a70;
                opacity: .5;
            }

            .textbox-text:focus {
                outline: none;
            }

            .textbox-face {
                position: absolute;
                background-color: #5c5a70;
                left: 0;
            }

            .textbox-side {
                transform: rotateY(90deg);
                height: 100%;
                width: 20px;
                top: 0;
                transform-origin: 0% 50%;
            }

            .textbox-bottom {
                transform: rotateX(90deg);
                height: 20px;
                width: 100%;
                bottom: 0;
                transform-origin: 50% 100%;
            }

            .textbox-top {
                transform: rotateX(-90deg);
                height: 20px;
                width: 100%;
                top: 0;
                transform-origin: 50% 0;
            }

            @keyframes hover {
                from {
                    transform: translateZ(10px);
                }

                to {
                    transform: translateZ(20px);
                }
            }

            @keyframes turnaround {
                0% {
                    transform: perspective(500px) rotateY(70deg) rotateZ(-10deg) rotateX(30deg);
                }

                33% {
                    transform: perspective(500px) rotateY(20deg) rotateZ(-10deg) rotateX(-30deg);
                }

                67% {
                    transform: perspective(0) rotateY(0deg) rotateZ(0deg) rotateX(0deg);
                }

                100% {
                    transform: perspective(500px) rotateY(70deg) rotateZ(-10deg) rotateX(30deg);
                }
            }

            .reference {
                position: absolute;
                right: 20px;
                bottom: 15px;
            }

            .reference img {
                width: 35px;
                height: 35px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    SeaBattle by Gleb
                </div>
                <div class="m-b-md">
                    <div class="textbox">
                        <div class="textbox-box">
                            <div class="textbox-face textbox-side"></div>
                            <div class="textbox-face textbox-bottom"></div>
                            <div class="textbox-face textbox-top"></div>
                            <div class="textbox-field">
                                <div class="textbox-label">Your login</div><input class="textbox-text" type="text" placeholder="Type here..." />
                            </div>
                            <div class="textbox-action">
                                <div class="textbox-face textbox-side"></div>
                                <div class="textbox-face textbox-top"></div>
                                <div class="textbox-face textbox-bottom"></div><svg viewBox="0 0 24 24">
                                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
