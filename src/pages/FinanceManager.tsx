import { useState, useEffect } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { FinanceStats } from "@/components/finance/FinanceStats";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function FinanceManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions((data || []) as Transaction[]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionSaved = () => {
    fetchTransactions();
    setShowForm(false);
    setEditingTransaction(null);
    toast({
      title: "Succès",
      description: editingTransaction ? "Transaction modifiée" : "Transaction ajoutée",
    });
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTransactions(transactions.filter(t => t.id !== id));
      toast({
        title: "Succès",
        description: "Transaction supprimée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la transaction",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestionnaire Financier</h1>
            <p className="text-muted-foreground">Gérez vos finances personnelles</p>
          </div>
          <Button
            onClick={() => {
              setEditingTransaction(null);
              setShowForm(true);
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nouvelle Transaction
          </Button>
        </div>

        <FinanceStats transactions={transactions} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          
          <div className="space-y-6">
            {showForm && (
              <TransactionForm
                transaction={editingTransaction}
                onSave={handleTransactionSaved}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTransaction(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}