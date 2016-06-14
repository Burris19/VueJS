<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    
	use DatabaseTransactions;

    public function testExample()
    {
    	factory(App\User::class)->create(['name' => 'Julian']);

        $this->get('name')
        	->assertResponseOk();
        	
        $this->see('Julian');

        	
    }
}
