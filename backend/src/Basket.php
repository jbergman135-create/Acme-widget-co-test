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


   public function total(): array
    {
        $subtotal = $this->calculateSubtotal();
        $discount = $this->calculateDiscount($subtotal);
        $subtotalAfterDiscount = $subtotal - $discount;
        $delivery = $this->calculateDelivery($subtotalAfterDiscount);
        $total = $subtotalAfterDiscount + $delivery;

        return [
            'subtotal' => round($subtotal, 2),
            'discount' => round($discount, 2),
            'subtotalAfterDiscount' => round($subtotalAfterDiscount, 2),
            'delivery' => round($delivery, 2),
            'total' => round($total, 2),
            'items' => $this->items
        ];
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

    private function calculateSubtotal(): float
    {
        $subtotal = 0;
        foreach ($this->items as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }
        return $subtotal;
    }


    private function calculateDiscount(float $subtotal): float
    {
        $discount = 0;

        foreach ($this->offers as $offer) {
            if ($offer['type'] === 'buy_one_get_second_half_price') {
                $productCode = $offer['productCode'];
                
                if (isset($this->items[$productCode])) {
                    $quantity = $this->items[$productCode]['quantity'];
                    $price = $this->items[$productCode]['price'];
                    
                   
                    $fullPriceItems = ceil($quantity / 2);
                    $discountItems = floor($quantity / 2);
                    
                    $discount += ($price / 2) * $discountItems;
                }
            }
        }

        return $discount;
    }

   
    private function calculateDelivery(float $amount): float
    {
        foreach ($this->deliveryRules as $rule) {
            if ($amount >= $rule['minAmount'] && $amount < $rule['maxAmount']) {
                return $rule['cost'];
            }
        }
        
        $lastRule = end($this->deliveryRules);
        if ($amount >= $lastRule['minAmount']) {
            return $lastRule['cost'];
        }

        return 0;
    }
}
