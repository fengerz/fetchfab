<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            'Арт и абстракция',
            'Архитектура', 
            'Еда и напитки', 
            'Животные и питомцы', 
            'Культурное наследие', 
            'Люди', 
            'Машины', 
            'Мебель и дом', 
            'Места и путешествия', 
            'Мода и стиль', 
            'Музыка', 
            'Наука и технологии', 
            'Новости и политика', 
            'Оружие и техника', 
            'Персонажи', 
            'Природа и растения', 
            'Спорт и фитнесс', 
            'Электроника и гаджеты'
        ];

        foreach ($list as $title) {
            Category::create([
                'title' => $title
            ]);
        }
    }
}
