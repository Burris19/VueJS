@extends('layout')

@section('content')
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h1>Styde.net / Curso de VueJS</h1>
      <app></app>
    </div>
  </div>
@endsection


@section('script')  

  <style>
    .fade-transition {
      transition: all 1s ease;
      opacity: 100;
      background: orange;
    }
    .fade-enter, .fade-leave {
      background: red;
      opacity: 0;
    }
    
    .alert_container { 
      height:  60px
    }

  </style>  

<script type="text/javascript" src="js/main.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">

@endsection()