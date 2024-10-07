<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::all(['id', 'name', 'price', 'quantity']);

        if (!$products->count())
            return response()->json([
                'success' => false,
                'message' => 'there are no products stored yet'
            ]);

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }
    public function store(Request $request)
    {
        $prod = $request->validate([
            'name' => 'required|string|min:5',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $prod['user_id'] = Auth::user()->id;

        $product = Product::create($prod);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'quantity' => $product->quantity,
                'price' => $product->price,
            ]
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $product = Product::find($id);

        return response()->json([
            'success' => $product === null ? false : true,
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->quantity,
            ]
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $prod = $request->validate([
            'name' => 'required|string|min:5',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $prod['user_id'] = Auth::user()->id;

        $product = Product::find($id);

        if ($product === null)
            return response()->json([
                'success' => false,
                'message' => 'product does not exists'
            ], 404);

        $product->name = $prod['name'];
        $product->price = $prod['price'];
        $product->quantity = $prod['quantity'];
        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'product updated successfully',
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->quantity,
            ]
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $product = Product::find($id);

        $success = $product?->delete();

        return response()->json([
            'success' => $success ? true : false,
            'message' => $success ? 'product deleted successfully' : 'product does not exist',
        ], $success ?  200 : 404);
    }
}
