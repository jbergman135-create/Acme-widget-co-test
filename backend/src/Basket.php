<?php

namespace AcmeWidgetCo;

class Basket
{
    private array $products = [];
    private array $deliveryRules = [];
    private array $offers = [];
    private array $items = [];

    public function __construct(array $products = [], array $deliveryRules = [], array $offers = [])
    {
        $this->products = $products;
        $this->deliveryRules = $deliveryRules;
        $this->offers = $offers;
    }

   
    public function add(string $productCode): void
    {
        $product = $this->findProduct($productCode);
        
        if (!$product) {
            throw new \Exception("Product code '{$productCode}' not found in catalog");
        }

        if (!isset($this->items[$productCode])) {
            $this->items[$productCode] = [
                'code' => $productCode,
                'name' => $product['name'],
                'price' => $product['price'],
                'quantity' => 0
            ];
        }

        $this->items[$productCode]['quantity']++;
    }

    private function findProduct(string $code): ?array
    {
        foreach ($this->products as $product) {
            if ($product['code'] === $code) {
                return $product;
            }
        }
        return null;
    }

}
