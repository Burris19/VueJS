<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    protected $table = 'notes';

    protected $fillable = [
    	'note',
    	'category_id'
    ];

    public function category()
    {
    	return $this->belongsTo(Category::class);
    }
}
