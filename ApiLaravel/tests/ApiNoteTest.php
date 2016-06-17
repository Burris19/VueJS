<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Note;
use App\Category;

class ApiNoteTest extends TestCase
{

	use DatabaseTransactions;

    function test_list_notes()
    {

    	$category = factory(Category::class)->create();
    	
    	$notes = factory(Note::class)->times(2)->create([
    		'category_id' => $category->id
    	]);

        $this->get('api/v1/notes')
        	->assertResponseOk()
        	->seeJson(Note::all()->toArray());
    }
}
