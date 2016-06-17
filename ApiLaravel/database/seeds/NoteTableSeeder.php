<?php

use Illuminate\Database\Seeder;

class NoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();

        $notes = factory(Note::class)->times(100)->make();

        foreach ($notes as $noe) {
        	$category = $categories->random();
        	$category->notes()->save($note);
        }
    }
}
