<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Note;
use App\Category;

class ApiNoteTest extends TestCase
{

	use DatabaseTransactions;

    protected $note = 'This is a note';

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

    function tests_can_create_a_note() 
    {
        $category = factory(Category::class)->create();

        $this->post('api/v1/notes', [
            'note'          => $this->note,
            'category_id'   => $category->id,
        ]);

        $this->seeInDatabase('notes', [
            'note'          => $this->note,
            'category_id'   => $category->id
        ]);

        $this->seeJsonEquals([
            'success' => true,
            'note' => Note::first()->toArray(),
        ]);
    }
    
    function test_validation_when_creating_a_note()
    {
        $this->post('api/v1/notes', [
            'note'          => '',
            'category_id'   => 100,
        ], ['Accept' => 'aplication/json']);

        $this->dontSeeInDatabase('notes', [
            'note'          => '',            
        ]);

        $this->seeJsonEquals([            
            'errors'  => [                
                    'The note field is required.',
                    'The selected category id is invalid.'
            ],
            'success' => false,
        ]);   
    }    


    function tests_can_update_a_note() 
    {
        /*
        *   Variable wiht text for update
        */
        $text = 'Update note';

        /*
        *   Create a new category
        */
        $category = factory(Category::class)->create();

        /*
        * Create another category for update
        */

        $anotherCategory = factory(Category::class)->create();

        /*
        * Create a note
        */

        $note = factory(Note::class)->make();

        /*
        * Relation note with category
        */

        $category->notes()->save($note);

        /*
        *  Send request for update note
        */
        $this->put('api/v1/notes'. $note->id, [
            'note'          => $text,
            'category_id'   => $anotherCategory->id,
        ]);

        /*
        * Check that in database update note
        */

        $this->seeInDatabase('notes', [
            'note'          => $text,
            'category_id'   => $anotherCategory->id
        ]);

        /*
        * Ckeck that response in format Json
        */

        // $this->seeJsonEquals([
        //     'success' => true,
        //     'note' => [
        //     'id' => $note->id,
        //     'note' => $text,
        //     'category_id' => $anotherCategory->id,
        //     ],
        //  ]);
    }


    function test_validation_when_updating_a_note()
    {
        /*
        *   Create a new category
        */
        $category = factory(Category::class)->create();

        /*
        * Create a note
        */

        $note = factory(Note::class)->make();

        /*
        * Relation note with category
        */

        $category->notes()->save($note);

        /*
        *   Send request with parament invalid
        */
        $this->put('api/v1/notes'. $note->id, [
            'note'          => '',
            'category_id'   => 100,
        ], ['Accept' => 'aplication/json']);

        /*
        * Check that not save note in the database
        */

        $this->dontSeeInDatabase('notes', [
            'id'    => $note->id,
            'note'  => '',            
        ]);

        /*
        *   Check that response with errors
        */
        // $this->seeJsonEquals([
        //      'success' => false,
        //      'errors'  => [
        //          'The note field is required.',
        //          'The selected category is invalid.'
        //      ]
        //  ]);


    }    

    function test_can_delete_a_note()
    {
        $note = factory(Note::class)->create();

        $this->delete('api/v1/notes/'.$note->id, [], [
            'Accept' => 'application/json'
        ]);

        $this->dontSeeInDatabase('notes', [
            'id' => $note->id
        ]);

        $this->seeJsonEquals([
            'success' => true
        ]);
    }

}
