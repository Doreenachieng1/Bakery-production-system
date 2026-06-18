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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ingredient_id')
                  ->constrained()
                  ->onDelete('cascade');          // delete ingredient → delete its orders
            $table->foreignId('supplier_id')
                  ->constrained()
                  ->onDelete('cascade');          // delete supplier → delete its orders
            $table->enum('payment_method', ['cash', 'mpesa']);
            $table->string('mpesa_ref', 20)->nullable();          //I required for mpesa only
            $table->decimal('quantity', 10, 2);
            $table->decimal('unit_price', 10, 2);
            $table->date('expected_delivery_date');
            $table->enum('status', ['pending', 'received', 'cancelled'])->default('pending'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
