import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dtos/customers.dto';
import { SupabaseService } from 'src/services/supabase.service';

@Injectable()
export class CustomersRepository {
  private table = 'customers';
  constructor(private readonly supabaseService: SupabaseService) {}

  private get supabase() {
    return this.supabaseService.getClient();
  }

  public async findByUserName(username: string) {
    const { data: existingUser, error: findError } = await this.supabase
      .from(this.table)
      .select('username')
      .eq('username', username)
      .single();
    return { data: existingUser, error: findError };
  }

  public async findAll() {
    const { data, error } = await this.supabase.from(this.table).select('*');

    if (error) {
      throw error;
    }

    return { data, error };
  }

  public async findById(id: number) {
    const { data, error } = await this.supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  public async create(customerData: CreateCustomerDto) {
    const { data, error } = await this.supabase
      .from(this.table)
      .insert([customerData]);

    if (error) {
      throw error;
    }

    return { data, error };
  }

  public async updateOne(id: number, updateData: CreateCustomerDto) {
    const { data, error } = await this.supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  public async destroy(id: number): Promise<void> {
    const { error } = await this.supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}
