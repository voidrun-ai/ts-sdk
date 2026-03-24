import { VoidRun } from '../src/index.js';

async function main() {
  const vr = new VoidRun({});

  console.log('Creating sandbox for large code tests...');
  const sdbx = await vr.createSandbox({
    name: 'test-large-code',
  });

  try {
    console.log('\n--- Testing Complex JavaScript Code (>1000 chars) ---');
    console.log('Scenario: Stock Market Simulation with Volatility');

    const largeJS = `
/**
 * Simulated Stock Market Engine
 * This script simulates the price movements of multiple stocks over a period of time
 * using a simplified random walk with volatility.
 */

class Stock {
    constructor(ticker, price) {
        this.ticker = ticker;
        this.price = price;
        this.history = [price];
    }

    update() {
        // Daily price movement: random float between -2.5% and +2.5%
        const change = 1 + (Math.random() * 0.05 - 0.025);
        this.price = Math.round((this.price * change) * 100) / 100;
        this.history.push(this.price);
    }
}

function runSimulation(days) {
    const portfolio = [
        new Stock("TECH", 150.00),
        new Stock("ENRG", 45.30),
        new Stock("RETL", 88.10),
        new Stock("HLTH", 120.50)
    ];

    console.log("--- Starting 30-Day Market Simulation ---");
    for (let day = 1; day <= days; day++) {
        portfolio.forEach(stock => stock.update());
    }

    console.log("Simulation Complete. Results:");
    portfolio.forEach(stock => {
        const start = stock.history[0];
        const end = stock.price;
        const diff = (end - start).toFixed(2);
        const pct = (((end / start) - 1) * 100).toFixed(2);
        console.log(\`  \${stock.ticker}: \${start} -> \${end} (\${diff} / \${pct}%)\`);
    });

    return portfolio.length;
}

console.log(runSimulation(30));
`;

    console.log(`JS Code length: ${largeJS.length} characters`);
    let result = await sdbx.runCode(largeJS, { language: 'javascript' });
    console.log('Stdout output:\n', result.stdout.trim());

    if (
      result.stdout.includes('30-Day Market Simulation') &&
      result.results === 4
    ) {
      console.log('✅ Complex JS execution PASS');
    } else {
      console.log('❌ Complex JS execution FAIL');
      process.exit(1);
    }

    console.log('\n--- Testing Complex Python Code (>1000 chars) ---');
    console.log('Scenario: Climate Data Statistical Analysis');

    const largePy = `
"""
Climate Data Analysis Tool
This script simulates processing a large set of daily temperature readings
and calculates statistical metrics including moving averages and anomalies.
"""

import random

def generate_sensor_data(days=365):
    # Base temp 15C, with annual seasonality and random noise
    data = []
    for day in range(days):
        seasonality = 10 * (day % 365 / 365) # Simple linear ramp for complexity
        noise = random.uniform(-2, 2)
        data.append(round(15 + seasonality + noise, 2))
    return data

def analyze_temperatures(data):
    count = len(data)
    avg = sum(data) / count
    max_t = max(data)
    min_t = min(data)
    
    # Calculate 7-day moving average
    moving_avgs = []
    for i in range(len(data)):
        if i < 7:
            moving_avgs.append(None)
        else:
            window = data[i-7:i]
            moving_avgs.append(round(sum(window) / 7, 2))
            
    print(f"--- Processed {count} Days of Climate Data ---")
    print(f"Global Average: {avg:.2f} C")
    print(f"Peak recorded: {max_t} C")
    print(f"Minimum recorded: {min_t} C")
    print(f"First 5 Moving Averages: {moving_avgs[7:12]}")
    
    return count

print(analyze_temperatures(generate_sensor_data(500)))
`;

    console.log(`Python Code length: ${largePy.length} characters`);
    result = await sdbx.runCode(largePy, { language: 'python' });
    console.log('Stdout output:\n', result.stdout.trim());

    if (
      result.stdout.includes('Processed 500 Days') &&
      result.results === 500
    ) {
      console.log('✅ Complex Python execution PASS');
    } else {
      console.log('❌ Complex Python execution FAIL');
      process.exit(1);
    }

    console.log('\n--- Testing Complex TypeScript Code (>1000 chars) ---');
    console.log('Scenario: Complex Data Processing with Types');

    const largeTS = `
/**
 * Complex Data Processing Engine
 * This script processes a list of transactions, grouping them by currency,
 * and performing currency conversions based on mock exchange rates.
 */

interface Transaction {
    id: string;
    amount: number;
    currency: string;
    date: Date;
    type: 'CREDIT' | 'DEBIT';
}

interface ExchangeRates {
    [currency: string]: number;
}

const RATES: ExchangeRates = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.75,
    'JPY': 110.0,
};

function generateTransactions(count: number): Transaction[] {
    const currencies = Object.keys(RATES);
    const types: ('CREDIT' | 'DEBIT')[] = ['CREDIT', 'DEBIT'];
    const transactions: Transaction[] = [];
    
    for (let i = 0; i < count; i++) {
        transactions.push({
            id: \`TXN-\${i.toString().padStart(5, '0')}\`,
            amount: Math.round(Math.random() * 10000) / 100,
            currency: currencies[Math.floor(Math.random() * currencies.length)],
            date: new Date(Date.now() - Math.random() * 10000000000),
            type: types[Math.floor(Math.random() * types.length)],
        });
    }
    return transactions;
}

function processTransactions(transactions: Transaction[], targetCurrency: string = 'USD') {
    let totalCredit = 0;
    let totalDebit = 0;
    
    // Some complex processing to ensure the length is > 1000 chars
    // We will iterate over the transactions, compute the converted amounts,
    // and aggregate the totals for credit and debit separatedly.
    
    for (const txn of transactions) {
        const rate = RATES[txn.currency];
        const targetRate = RATES[targetCurrency];
        
        // Convert to USD first, then to target currency
        const amountInUSD = txn.amount / rate;
        const convertedAmount = amountInUSD * targetRate;
        
        if (txn.type === 'CREDIT') {
            totalCredit += convertedAmount;
        } else {
            totalDebit += convertedAmount;
        }
    }
    
    console.log(\`--- Processed \${transactions.length} Transactions ---\`);
    console.log(\`Total Credit: \${totalCredit.toFixed(2)} \${targetCurrency}\`);
    console.log(\`Total Debit:  \${totalDebit.toFixed(2)} \${targetCurrency}\`);
    console.log(\`Net Balance:  \${(totalCredit - totalDebit).toFixed(2)} \${targetCurrency}\`);
    
    return transactions.length;
}

const txns = generateTransactions(250);
console.log(processTransactions(txns, 'EUR'));
`;

    console.log(`TS Code length: ${largeTS.length} characters`);
    result = await sdbx.runCode(largeTS, { language: 'typescript' });
    console.log('Stdout output:\n', result.stdout.trim());

    if (
      result.stdout.includes('Processed 250 Transactions') &&
      result.results === 250
    ) {
      console.log('✅ Complex TypeScript execution PASS');
    } else {
      console.log('❌ Complex TypeScript execution FAIL');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  } finally {
    console.log('\nRemoving sandbox...');
    await sdbx.remove();
    console.log('Done.');
  }
}

main().catch(console.error);
