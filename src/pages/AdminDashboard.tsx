import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, MessageSquare, TrendingUp, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/ui/loading-spinner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    contact_submissions: 0,
    demo_requests: 0,
    admin_requests: 0,
    esg_reports: 0,
    total_users: 0,
    pending_approvals: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [
        { count: contactCount },
        { count: demoCount },
        { count: adminRequestCount },
        { count: esgCount },
        { count: userCount },
        { count: pendingCount }
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('demo_requests').select('*', { count: 'exact', head: true }),
        supabase.from('admin_requests').select('*', { count: 'exact', head: true }),
        supabase.from('esg_reports').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('admin_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      setStats({
        contact_submissions: contactCount || 0,
        demo_requests: demoCount || 0,
        admin_requests: adminRequestCount || 0,
        esg_reports: esgCount || 0,
        total_users: userCount || 0,
        pending_approvals: pendingCount || 0
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async () => {
    try {
      const { error } = await supabase.functions.invoke('send-admin-notification', {
        body: {
          type: 'test',
          data: {
            message: 'Test email from admin dashboard',
            sent_at: new Date().toISOString(),
            admin_user: user?.email
          }
        }
      });

      if (error) throw error;
      toast.success('Test email sent successfully!');
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Failed to send test email. Please check RESEND_API_KEY configuration.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <div className="container mx-auto px-4 py-24">
          <LoadingSpinner size="lg" text="Loading admin dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor system activity and user engagement
          </p>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button onClick={sendTestEmail} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Test Email Notifications
              </Button>
              <Button onClick={fetchStats} variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Refresh Statistics
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contact_submissions}</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demo Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.demo_requests}</div>
              <p className="text-xs text-muted-foreground">Potential customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Signup Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admin_requests}</div>
              <p className="text-xs text-muted-foreground">User approvals</p>
              {stats.pending_approvals > 0 && (
                <Badge variant="destructive" className="mt-2">
                  {stats.pending_approvals} pending
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ESG Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.esg_reports}</div>
              <p className="text-xs text-muted-foreground">Reports generated</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              All submissions are automatically sent to loveonnstudio@gmail.com
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="mb-4">
              Auto-forwarding Active
            </Badge>
            <p className="text-sm text-muted-foreground">
              Contact forms, demo requests, and ESG reports are automatically forwarded for review.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;