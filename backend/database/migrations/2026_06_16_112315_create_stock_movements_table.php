<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ingredient_id')
                  ->constrained()
                  ->onDelete('cascade');          // delete ingredient → delete its stock movements
            $table->enum('movement_type', ['in', 'out']);
            $table->decimal('quantity', 10, 2);
            $table->string('reference')->nullable();          // e.g. "Purchase Order #S
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
