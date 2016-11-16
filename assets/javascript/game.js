

    var a_game_data ={
    	i_wins: 0,
    	i_guesses_remaining:0,
    	i_found:0,
    	i_word_length:0,
    	i_letters_guessed_lenght: 0,
    	i_letters_in_word_length: 0,
    	s_word:" ",
    	s_word_hidden:"_",
    	s_letters_guessed: "",
    	b_won_current_game: false,
    	b_game_over: true,
    	a_letters_guessed: [],
    	a_letters_in_word:[],
    	a_letters_found : [],
    	a_word_list:["enterpise", "klingon", "kirk", "spock", "bones","bajoran", "barclay","cardassian","stardate","dilithium","synthehol","picard","transporter","vulcan","warp"],
    	
    	a_oseiisms_list:["show me your code", "memorize", "you can do this", "i bake cookies", "pop-bamb", "i dance hip-hop","now for something really strange", "slack me","i'll be at whole foods","meet at a public place to code in a group","ask me questions"],
    	
    	m_win_up: function() {
          this.i_wins ++;
        },

        m_reset_for_new_game: function() {
          this.i_guesses_remaining = 12;
          this.i_found = 0;
          this.s_word = " ";
          this.s_word_hidden = "_";
          this.m_assign_a_new_word();
          this.i_word_length = this.s_word.length;
          this.s_letters_guessed = "";
          this.a_letters_guessed = [];
          this.a_letters_in_word = [];
          this.a_letters_found = [];
          //this.b_game_over = false;
        },

        m_assign_a_new_word: function() {
        	// don't call this directly
        	// this is for use inside  the game_data object
        	var i_word_list_length = this.a_word_list.length;
        	var i_random_number = Math.floor((Math.random() * i_word_list_length) );
        	this.s_word = this.a_word_list[i_random_number];

        	// this is for debug only
        	//document.getElementById("the_word").innerHTML = this.s_word;
        	document.getElementById("the_word").innerHTML = "";

        	this.i_word_length =this.s_word.length;
        	this.s_word_hidden = "";
        	for(var i = 0; i < this.i_word_length; i++)
        	{
        		this.s_word_hidden = this.s_word_hidden + "_ "
        		var s_letter = this.s_word.substring(i, i + 1);
        		this.a_letters_in_word.push(s_letter);
        	}

        	for(var i = 0; i < this.i_word_length; i++)
        	{
        		s_letter = this.a_letters_in_word[i];
        	}
        },

		m_assign_a_new_osei: function() {	// finished
        	var i_word_list_length = this.a_oseiisms_list.length;
        	var i_random_number = Math.floor((Math.random() * i_word_list_length) );
        	s_osei = this.a_oseiisms_list[i_random_number];
        	return s_osei;
        },

		m_re_encode_word: function(s_key) {
			var i_safe = 15;
			this.s_word_hidden = "";
			var i_index = this.s_word.indexOf(s_key);
			if (i_index > -1)
			{
				for(var i = 0; i < this.i_word_length; i++)
        			{
        				var s_char = this.s_word.substring(i,i+1);
        				var val = this.a_letters_found.indexOf(s_char);
        				if (val > -1)
        				{
        					this.s_word_hidden = this.s_word_hidden + s_char + " ";
        				}
        				else
        				{
        					this.s_word_hidden = this.s_word_hidden + "_ ";
        				}
        			
        			}

			}
			//console.log("Done in m_re_encode_word");
        },

        add_letter_to_used_list: function (s_key) // finished
        {
        	this.a_letters_guessed.push(s_key);
        },

        add_letter_to_used_string: function (s_key) // finished
        {
        	this.s_letters_guessed = this.s_letters_guessed + s_key + " ";
        },

        count_number_of_times_the_letter_is_in_the_word: function (s_l_word, s_key)
        {
        	var i_return_val = 0;
        	var i_return_val = count_str_in_string(this.s_word,s_key);
        	if (i_return_val > 0){
        		this.a_letters_found.push(s_key);
        	}
        	return i_return_val;
        },

        was_letter_used: function (s_key)
        {
        	var b_return_value = false;
        	var i_index = this.a_letters_guessed.indexOf(s_key);
        	if (i_index > -1)
        	{
        		b_return_value = true;
        	}
        	return b_return_value;
        },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//													m_play 													//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


		m_play: function(s_key) {
        	// Step 1

        	var b_result = this.was_letter_used(s_key);
        	if (b_result === true){
        		return;}
        	// Step 2

			this.i_guesses_remaining--;
			//document.getElementById("guesses_remaining_data").innerHTML = this.i_guesses_remaining.toString();
			// Step 3

			this.add_letter_to_used_list(s_key);
			this.add_letter_to_used_string(s_key);
			document.getElementById("letters_already_guessed_data").innerHTML = this.s_letters_guessed
			console.log("---------------------------------------------  D ");

			// Step 4
			var i_numb_found = this.count_number_of_times_the_letter_is_in_the_word(this.s_word,s_key)
			this.i_found = this.i_found + i_numb_found;
			if (i_numb_found > 0)
			{
				this.i_guesses_remaining++;
			}
			document.getElementById("guesses_remaining_data").innerHTML = this.i_guesses_remaining.toString();
			this.m_re_encode_word(s_key);
			if (this.s_word_hidden != "")
			{
				console.log("this.s_word_hidden is " + this.s_word_hidden);
				document.getElementById("current_word_data").innerHTML = this.s_word_hidden;	// B
			}
			console.log("---------------------------------------------  B ");

			// Step 5
			if (this.i_word_length == this.i_found)
			{
				win_up();
				this.b_game_over = true;
				document.getElementById("press_any_key_to_start").innerHTML = "You won! Press a letter key";
				playAudio();
				a_game_data.m_reset_for_new_game();
				//document.getElementById("current_word_data").innerHTML = this.s_word_hidden;
				myFunction_show_won();
			}
			else if (this.i_guesses_remaining < 1) 
				{ 	this.b_game_over = true;
					//document.getElementById("press_any_key_to_start").innerHTML = "You Lost!";
					document.getElementById("press_any_key_to_start").innerHTML = "You lost. The word was " + this.s_word + " " + ". Press a letter key"; 
					myFunction_show_lost();
					pauseAudio();
				}
			// Step 6 done with m_play
			return; // no return value expected
        },	// END of m_play: function
		b_dummy: true,
    } // end of a_game_data


//<!-- ---------------------------------- MAIN LOOP begin --------------------------------------- -->
	document.onkeyup = function(event) {
    if (a_game_data.b_game_over === true)
	    {
			//document.getElementById("press_any_key_to_start").innerHTML = a_game_data.m_assign_a_new_osei;
			a_game_data.m_reset_for_new_game();
			document.getElementById("press_any_key_to_start").innerHTML = "Press a letter key";
			document.getElementById("current_word_data").innerHTML = a_game_data.s_word_hidden;
			a_game_data.b_game_over = false;
			stopAudio();
	    }

	    else if (a_game_data.b_game_over === false)
	    {
	    	// Update Displey with an OSEI-ism
	    	document.getElementById("press_any_key_to_start").innerHTML = a_game_data.m_assign_a_new_osei();
	    	if (isLetter(event.key)){
	    		myFunction_show_playing();
	    		a_game_data.m_play(event.key);
			}
	    }
    } // end of document.onkeyup

//<!-- ---------------------------------- MAIN LOOP end --------------------------------------- -->

//<!-- --------------------------------- Begin Funtions --------------------------------------- -->



	function playAudio() {
		var x = document.getElementById("myAudio");
	    x.play();
	    // http://audiotrimmer.com/# up to 10 Meg size
	}

	function stopAudio() {
		var x = document.getElementById("myAudio");

	    x.pause();
	    // http://audiotrimmer.com/# up to 10 Meg size
	}

	function pauseAudio() {
		var x = document.getElementById("myAudio");
	    x.pause();
	    // http://audiotrimmer.com/# up to 10 Meg size
	}

	//var x = document.getElementById("myAudio");


<!-- ------------------------------------------------------ -->

	function isLetter(str) {
  		return str.length === 1 && str.match(/[a-z]/i);
	}
<!-- ------------------------------------------------------ -->

<!-- ------------------------------------------------------ -->
    function win_up (){
      a_game_data.m_win_up();
      document.getElementById("wins_data").innerHTML = a_game_data.i_wins.toString();
    }
<!-- ------------------------------------------------------ -->

<!-- ------------------------------------------------------ -->

	function up_date_display_of_word (){
    	var s_word = a_game_data.s_word_hidden;
    	document.getElementById("current_word_data").innerHTML = s_word;
    }
<!-- ------------------------------------------------------ -->

<!-- ------------------------------------------------------ -->
	function up_date_game_status (){
    	var s_word = a_game_data.s_word_hidden;
    	document.getElementById("press_any_key_to_start").innerHTML = s_word;
    }
<!-- ------------------------------------------------------ -->

<!-- ------------------------------------------------------ -->
function count_str_in_string(s_input,s_to_find)
{
	var i_return_val = 0;
	var i_len = s_input.length;

	for(var i = 0; i < i_len; i++)
	{
		if (s_input.substring(i,i+1) === s_to_find)
		{
			i_return_val++;
		}
	}
	return i_return_val;
}
<!-- ------------------------------------------------------ -->


function myFunction_show_3() {

	//var the_image_id = document.getElementById("the_word");
	var the_image_id = document.getElementById("the_image");
	the_image_id.src = "./assets/images/3_.jpg";
}

<!-- ------------------------------------------------------ -->
<!-- ------------------------------------------------------ -->


function myFunction_show_playing() {

	//var the_image_id = document.getElementById("the_word");
	var the_image_id = document.getElementById("the_image");
	the_image_id.src = "./assets/images/Spock.jpg";
}

<!-- ------------------------------------------------------ -->
<!-- ------------------------------------------------------ -->


function myFunction_show_won() {

	//var the_image_id = document.getElementById("the_word");
	var the_image_id = document.getElementById("the_image");
	the_image_id.src = "./assets/images/starship.jpg";
}

<!-- ------------------------------------------------------ -->
<!-- ------------------------------------------------------ -->


function myFunction_show_reset() {

	//var the_image_id = document.getElementById("the_word");
	var the_image_id = document.getElementById("the_image");
	the_image_id.src = "./assets/images/3_.jpg";
}

<!-- ------------------------------------------------------ -->
<!-- ------------------------------------------------------ -->


function myFunction_show_lost() {

	//var the_image_id = document.getElementById("the_word");
	var the_image_id = document.getElementById("the_image");
	the_image_id.src = "./assets/images/lost.jpg";
}

<!-- ------------------------------------------------------ -->

//<!-- -------------------------------- End of Funtions -------------------------------------- -->

// test this function
//var i_numb = count_str_in_string("toastasa","a");
//console.log("BOOM! i_numb: " + i_numb.toString());


