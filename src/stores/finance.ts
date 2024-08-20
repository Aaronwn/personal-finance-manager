import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'

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
    },
    exportToExcel() {
      const transactionsSheet = XLSX.utils.json_to_sheet(this.transactions)
      const categoriesSheet = XLSX.utils.json_to_sheet(this.categories.map(c => ({ category: c })))
      const budgetSheet = XLSX.utils.json_to_sheet(
        Object.entries(this.budget).map(([category, amount]) => ({ category, amount }))
      )

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, transactionsSheet, "Transactions")
      XLSX.utils.book_append_sheet(workbook, categoriesSheet, "Categories")
      XLSX.utils.book_append_sheet(workbook, budgetSheet, "Budget")

      XLSX.writeFile(workbook, "finance_data.xlsx")
    },

    importFromExcel(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })

            const transactionsSheet = workbook.Sheets["Transactions"]
            const categoriesSheet = workbook.Sheets["Categories"]
            const budgetSheet = workbook.Sheets["Budget"]

            if (transactionsSheet) {
              this.transactions = XLSX.utils.sheet_to_json(transactionsSheet)
            }
            if (categoriesSheet) {
              this.categories = XLSX.utils.sheet_to_json(categoriesSheet).map((row: any) => row.category)
            }
            if (budgetSheet) {
              this.budget = XLSX.utils.sheet_to_json(budgetSheet).reduce((acc: Record<string, number>, row: any) => {
                acc[row.category] = row.amount
                return acc
              }, {})
            }

            resolve('数据导入成功')
          } catch (error) {
            reject('导入数据失败: ' + error.message)
          }
        }
        reader.readAsArrayBuffer(file)
      })
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