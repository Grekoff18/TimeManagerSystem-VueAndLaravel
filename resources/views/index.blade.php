<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>*</title>
	<link rel="stylesheet" href="{{ asset("css/app.css") }}">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
	<div id="app">
    <main-page/>
		<router-view></router-view>
	</div>
	<script type="text/javascript" src="{{asset("js/app.js")}}"></script>
</body>
</html>
