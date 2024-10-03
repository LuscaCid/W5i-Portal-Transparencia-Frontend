export class Mask {
    public static Cnpj(cnpj : string){
        if (cnpj.length <= 14) {  
            cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");

            cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1 $2 $3");

            cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");

            cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
        } 
        return cnpj
    }
    public static Cpf(cpf : string){
        if (cpf.length <= 11) {  
            cpf = cpf.replace(/^(\d{3})\d{3}(\d{3})\d{2}$/, '###.###.$1-$2');
        }
        return cpf;
    }
}
