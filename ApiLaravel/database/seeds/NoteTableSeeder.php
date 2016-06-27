<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\Note;

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

        $notes = factory(Note::class)->times(5)->make();

        foreach ($notes as $note) {
        	$category = $categories->random();
        	$category->notes()->save($note);
        }
    }
}
