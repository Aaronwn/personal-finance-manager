import { defineStore } from 'pinia'

interface Transaction {
  id: number
  type: 'income' | 'expense'
  amount: number
  category: string
  date: string
  description: string
}

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    transactions: [] as Transaction[],
    categories: [] as string[],
    budget: {} as Record<string, number>
  }),
  actions: {
    addTransaction(transaction: Omit<Transaction, 'id'>) {
      const id = this.transactions.length + 1
      this.transactions.push({ ...transaction, id })
    },
    removeTransaction(id: number) {
        this.transactions = this.transactions.filter(t => t.id !== id)
    },
    addCategory(category: string) {
      if (!this.categories.includes(category)) {
        this.categories.push(category)
      }
    },
    setBudget(category: string, amount: number) {
      this.budget[category] = amount
    }
  },
  getters: {
    totalIncome(): number {
      return this.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    },
    totalExpense(): number {
      return this.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    },
    balance(): number {
      return this.totalIncome - this.totalExpense
    }
  },
  persist: {
    key: 'finance-data',
    storage: localStorage,
  }
})