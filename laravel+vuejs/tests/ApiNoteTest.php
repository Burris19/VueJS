<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Note;
use App\Category;

class ApiNoteTest extends TestCase
{

	use DatabaseTransactions;

    public function test_list_notes()
    {

    	$category = factory(Category::class)->create();

    	$notes = factory(Note::class)->create([
    		'category_id' => $category->id
    	]);

        $this->get('api/v1/notes')
        	->assertResponseOk()
        	->seeJsonEquals(Note::select(['id', 'note', 'category_id'])->get()->toArray());
    }
}
